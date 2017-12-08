import { CatchBudget } from '../../catch-all';

export class MontthInCarouselBudget {

    public firstDate: Date;
    public lastDate: Date;
    public catchBudgets: CatchBudget[] = [];
    public budgetByGroups: any[] = [];

    constructor(
        public date: Date
    ) {
        this.firstDate = new Date(date.getFullYear(), date.getMonth(), 1);
        this.lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        // console.log(this.firstDate, this.lastDate);
    }

}
