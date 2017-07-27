import { Month } from '../month/month';

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
}
