import { Day } from '../day/day';

export class Week {

    public days: Day[] = [];
    private today: Date;

    constructor(
        private date: Date
    ) {
        this.today = new Date();
        this.initWeekAndCreateDays(this.date);
    }

    private initWeekAndCreateDays(date: Date) {
        const currentDay: number = date.getDay();
        let count: number;
        if (currentDay === 1 || currentDay === 5) {
            count = 0;
        } else if (currentDay === 2 || currentDay === 6) {
            count = 1;
        } else if (currentDay === 3 || currentDay === 0) {
            count = 2;
        } else {
            count = 3;
        }
        this.createDays(new Date(date.getFullYear(), date.getMonth(), date.getDate() - count - 1, 12, 0, 0));
    }

    private createDays(dayDate: Date) {
        this.days = [];
        for (let i = 1; i <= 7; i++) {
            const currentDate: Date = new Date(dayDate.getFullYear(), dayDate.getMonth(), dayDate.getDate() + i);
            this.days.push(new Day(currentDate, this.today));
            if (currentDate.getDay() === 0) {
                this.days.push(new Day(currentDate));
            }
        }
    }

    selectDate(date: Date): Day {
        let day: Day = null;
        this.days.forEach(d => {
            if (d.date !== undefined) {
                if (d.date.getDate() === date.getDate()
                    && d.date.getMonth() === date.getMonth()
                    && d.date.getFullYear() === date.getFullYear()) {
                    d.isSelected = true;
                    day = d;
                } else {
                    d.isSelected = false
                }
            }
        });
        return day;
    }

    goToday(): Day[] {
        this.initWeekAndCreateDays(new Date());
        return this.days;
    }

    next(): Day[] {
        this.createDays(this.days[7].date);
        return this.days;
    }

    previous(): Day[] {
        const dayDate: Date = this.days[0].date;
        this.days = [];
        for (let i = 1; i < 8; i++) {
            const currentDate: Date = new Date(dayDate.getFullYear(), dayDate.getMonth(), dayDate.getDate() - i);
            if (currentDate.getDay() === 0) {
                this.days.unshift(new Day(currentDate));
            }
            this.days.unshift(new Day(currentDate, this.today));
        }
        return this.days;
    }

}
