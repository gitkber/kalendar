import { Day } from "../day/day";

export class FourDays {

    public days: Day[] = [];
    public day1: Day;
    public day2: Day;
    public day3: Day;
    public day4: Day;

    private dayDate: Date;

    constructor(
        public today: Date
    ) {
        this.dayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1, 12, 0, 0);
        this.day1 = new Day(this.dayDate, today);
        this.day2 = new Day(today, today);
        this.dayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 12, 0, 0);
        this.day3 = new Day(this.dayDate, today);
        this.dayDate = new Date(this.dayDate.getFullYear(), this.dayDate.getMonth(), this.dayDate.getDate() + 1, 12, 0, 0);
        this.day4 = new Day(this.dayDate, today);
    }

    next() {
        this.day1 = this.day2;
        this.day2 = this.day3;
        this.day3 = this.day4;
        this.dayDate = new Date(this.dayDate.getFullYear(), this.dayDate.getMonth(), this.dayDate.getDate() + 1, 12, 0, 0);
        this.day4 = new Day(this.dayDate, new Date());
    }

    previous() {
        this.day4 = this.day3;
        this.day3 = this.day2;
        this.day2 = this.day1;
        this.dayDate = new Date(this.dayDate.getFullYear(), this.dayDate.getMonth(), this.dayDate.getDate() - 1, 12, 0, 0);
        this.day1 = new Day(new Date(this.dayDate.getFullYear(), this.dayDate.getMonth(), this.dayDate.getDate() - 3, 12, 0, 0), new Date());

    }
}