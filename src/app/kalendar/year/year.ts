import { Month } from '../month/month';
import { Day } from '../day/day';

export class Year {

    public months: Month[] = [];

    constructor(
        public year: number
    ) {
        this.createYear();
    }

    private createYear() {
        for (let index = 1; index <= 12; index++) {
            this.months.push(new Month(index, this.year));
        }
    }

    selectDate(date: Date): Day {
        let day: Day = null;
        this.months.forEach(m => {
            m.days.forEach(d => {
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
        })
        return day;
    }
}
