import { Day } from '../day/day';

export class Month {

    public lastDateOfMonth: Date;
    public days: Day[] = [];

    constructor(
        public month: number,
        public year: number
    ) {
        this.createDays();
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

    jump(month: number, year: number) {
        this.month = month;
        this.year = year;
        this.createDays();
    }

    private createDays() {
        const today: Date = new Date();
        this.lastDateOfMonth = new Date(this.year, this.month, 0);

        this.days = [];
        //
        this.createDisabledPreviousDays();
        //
        for (let index = 1; index <= this.lastDateOfMonth.getDate(); index++) {
            const dayDate = new Date(this.year, this.month - 1, index, 12, 0, 0);
            this.days.push(new Day(dayDate, today));
        }
        //
        this.createDisabledNextDays();
    }

    private createDisabledPreviousDays() {
        let currentDate = new Date(this.year, this.month - 1, 1, 12, 0, 0);
        const countDay = currentDate.getDay() === 0 ? 6 : currentDate.getDay() - 1;

        currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - countDay, 12, 0, 0);
        for (let index = 1; index <= countDay; index++) {
            this.days.push(new Day(currentDate));
            currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1, 12, 0, 0);
        }
    }

    private createDisabledNextDays() {
        let currentDate = new Date(this.lastDateOfMonth.getFullYear(), this.lastDateOfMonth.getMonth(), this.lastDateOfMonth.getDate(), 12, 0, 0);
        const countDay = this.lastDateOfMonth.getDay() === 0 ? 0 : 7 - this.lastDateOfMonth.getDay();

        for (let index = 1; index <= countDay; index++) {
            currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1, 12, 0, 0);
            this.days.push(new Day(currentDate));
        }
    }
}
