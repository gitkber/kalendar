import { Day } from '../day/day';

export class Week {

    public days: Day[] = [];

    constructor(
        public today: Date
    ) {
        const currentDay: number = today.getDay();
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
        const dayDate:Date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - count, 12, 0, 0);
        for (let i = 0; i < 7; i++) {
            this.days.push(new Day(new Date(dayDate.getFullYear(), dayDate.getMonth(), dayDate.getDate() + i), today));
        }
        if (dayDate.getDay() === 1) {
            this.days.push(new Day(new Date(dayDate.getFullYear(), dayDate.getMonth(), dayDate.getDate() + 7)));
        } else {
            this.days.splice(3, 0, new Day(today));
        }
    }

    next(): Day[] {
        this.days = this.days.slice(4, 8);
        if (this.days[0].date.getDay() === 1) {
            const dayDate:Date = this.days[3].date;
            for (let i = 1; i < 4; i++) {
                this.days.push(new Day(new Date(dayDate.getFullYear(), dayDate.getMonth(), dayDate.getDate() + i), this.today));
            }
            this.days.push(new Day(this.today));
            return this.days.slice(4, 7);
        }
        const dayDate: Date = this.days[2].date;
        for (let i = 1; i < 5; i++) {
            this.days.push(new Day(new Date(dayDate.getFullYear(), dayDate.getMonth(), dayDate.getDate() + i), this.today));
        }
        return this.days.slice(4, 8);
    }

    previous(): Day[] {
        this.days = this.days.slice(0, 4);
        const dayDate:Date = this.days[0].date;
        if (this.days[0].date.getDay() === 1) {
            this.days.unshift(new Day(this.today));
            for (let i = 1; i < 4; i++) {
                this.days.unshift(new Day(new Date(dayDate.getFullYear(), dayDate.getMonth(), dayDate.getDate() - i), this.today));
            }
            return this.days.slice(0, 3);
        }
        for (let i = 1; i < 5; i++) {
            this.days.unshift(new Day(new Date(dayDate.getFullYear(), dayDate.getMonth(), dayDate.getDate() - i), this.today));
        }
        return this.days.slice(0, 4);
    }

}
