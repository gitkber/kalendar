import { Budget } from '../../budget';

export class MonthInCarouselBudget {

    public firstDate: Date;
    public lastDate: Date;
    public budgets: Budget[] = [];
    public budgetByGroups: any[] = [];

    constructor(
        public date: Date
    ) {
        this.firstDate = new Date(date.getFullYear(), date.getMonth(), 1);
        this.lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    }

}
