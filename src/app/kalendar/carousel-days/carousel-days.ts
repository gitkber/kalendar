import { Day } from '../day/day';

export class CarouselDays {

    public days: Day[] = [];
    private today: Date;
    public dateSelected: Date;

    constructor(
        private date: Date
    ) {
        this.dateSelected = date;
        this.today = new Date();
        this.initWeekAndCreateDays(this.date);
        this.selectDate(this.dateSelected);
    }

    private initWeekAndCreateDays(date: Date) {
        this.days = [];
        for (let i = 2; i > 0; i--) {
            this.days.push(new Day(new Date(date.getFullYear(), date.getMonth(), date.getDate() - i, 12, 0, 0), this.today));
        }
        for (let i = 0; i <= 4; i++) {
            this.days.push(new Day(new Date(date.getFullYear(), date.getMonth(), date.getDate() + i, 12, 0, 0), this.today));
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

    nextWeek(): Day[] {
        return this.nextDays(7);
    }

    private nextDays(count: number): Day[] {
        const newDays: Day[] = [];
        for (let i = 0; i < count; i++) {
            const day: Day = new Day(
                new Date(this.days[6].date.getFullYear(), this.days[6].date.getMonth(), this.days[6].date.getDate() + 1, 12, 0, 0), this.today);
            newDays.push(day)
            this.days.shift();
            this.days.push(day);
        }
        this.dateSelected = this.days[2].date;
        this.selectDate(this.dateSelected);
        return newDays;
    }

    previousWeek(): Day[] {
        return this.previousDays(7);
    }

    private previousDays(count: number): Day[] {
        const newDays: Day[] = [];
        for (let i = 0; i < count; i++) {
            const day: Day = new Day(
                new Date(this.days[0].date.getFullYear(), this.days[0].date.getMonth(), this.days[0].date.getDate() - 1, 12, 0, 0), this.today);
            newDays.push(day)
            this.days.pop();
            this.days.unshift(day);
        }
        this.dateSelected = this.days[2].date;
        this.selectDate(this.dateSelected);
        return newDays;
    }

    goToDate(dateClicked: Date): Day[] {
        if (dateClicked < this.dateSelected) {
            return this.previousDays(this.daysBetween(this.dateSelected, dateClicked));
        } else {
            return this.nextDays(this.daysBetween(dateClicked, this.dateSelected));
        }
    }

    private daysBetween(date1, date2) {
        // The number of milliseconds in one day
        const oneDay = 1000 * 60 * 60 * 24;

        // Convert both dates to milliseconds
        const dateMS1 = date1.getTime();
        const dateMS2 = date2.getTime();

        // Calculate the difference in milliseconds
        const differenceMS = Math.abs(dateMS1 - dateMS2);

        // Convert back to days and return
        return Math.round(differenceMS / oneDay);
    }
}
