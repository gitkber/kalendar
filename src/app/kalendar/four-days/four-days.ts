import { Day } from "../day/day";

export class FourDays {

    public days: Day[] = [];
    private dayDate: Date;

    constructor(
        public today: Date
    ) {
        this.dayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1, 12, 0, 0);
        this.days.push(new Day(this.dayDate, today));
        this.pushNextDayDate();
        this.pushNextDayDate();
        this.pushNextDayDate();
    }

    next() {
        this.days.shift();
        this.pushNextDayDate();
    }

    previous() {
        this.days.pop();
        this.dayDate = new Date(this.dayDate.getFullYear(), this.dayDate.getMonth(), this.dayDate.getDate() - 1, 12, 0, 0);
        this.days.unshift(new Day(new Date(this.dayDate.getFullYear(), this.dayDate.getMonth(), this.dayDate.getDate() - 3, 12, 0, 0), this.today));
    }

    private pushNextDayDate() {
        this.dayDate = new Date(this.dayDate.getFullYear(), this.dayDate.getMonth(), this.dayDate.getDate() + 1, 12, 0, 0);
        this.days.push(new Day(this.dayDate, this.today));
    }
}