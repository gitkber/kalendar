import { Day } from '../day/day';

export class FourDays {

    public days: Day[] = [];
    private dayDate: Date;

    constructor(
        public today: Date
    ) {
        this.dayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1, 12, 0, 0);
        this.days.push(new Day(this.dayDate, today));
        for (let i = 0; i < 7; i++) {
            this.pushNextDayDate();
        }
    }

    next(): Day {
        this.days.shift();
        this.pushNextDayDate();
        return this.days[this.days.length - 1];
    }

    previous(): Day {
        this.days.pop();
        this.dayDate = new Date(this.dayDate.getFullYear(), this.dayDate.getMonth(), this.dayDate.getDate() - 1, 12, 0, 0);
        this.days.unshift(new Day(new Date(this.dayDate.getFullYear(), this.dayDate.getMonth(), this.dayDate.getDate() - 7, 12, 0, 0), this.today));
        return this.days[0];
    }

    private pushNextDayDate() {
        this.dayDate = new Date(this.dayDate.getFullYear(), this.dayDate.getMonth(), this.dayDate.getDate() + 1, 12, 0, 0);
        this.days.push(new Day(this.dayDate, this.today));
    }
}
