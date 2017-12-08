import { MontthInCarouselBudget } from './month-in-carousel-budget/montth-in-carousel-budget';

export class CarouselBudget {

    public months: MontthInCarouselBudget[] = [];
    private today: Date;
    public monthSelected: Date;

    constructor(
        private date: Date
    ) {
        this.monthSelected = date;
        this.today = new Date();
        this.initMonth(this.date);
    }

    private initMonth(date: Date) {
        this.months.push(new MontthInCarouselBudget(new Date(date.getFullYear(), date.getMonth() - 3, date.getDate(), 12, 0, 0)));
        this.months.push(new MontthInCarouselBudget(new Date(date.getFullYear(), date.getMonth() - 2, date.getDate(), 12, 0, 0)));
        this.months.push(new MontthInCarouselBudget(new Date(date.getFullYear(), date.getMonth() - 1, date.getDate(), 12, 0, 0)));
        this.months.push(new MontthInCarouselBudget(date));
        this.months.push(new MontthInCarouselBudget(new Date(date.getFullYear(), date.getMonth() + 1, date.getDate(), 12, 0, 0)));
        this.months.push(new MontthInCarouselBudget(new Date(date.getFullYear(), date.getMonth() + 2, date.getDate(), 12, 0, 0)));
    }

    private previousMonth(count: number): MontthInCarouselBudget[] {
        const newMonth: MontthInCarouselBudget[] = [];
        console.log('prev', count);
        for (let i = 0; i < count; i++) {
            const month: MontthInCarouselBudget = new MontthInCarouselBudget(
                new Date(this.months[0].date.getFullYear(), this.months[0].date.getMonth() - 1, this.months[0].date.getDate(), 12, 0, 0));
            newMonth.push(month);
            this.months.pop();
            this.months.unshift(month);
        }
        this.monthSelected = this.months[3].date;
        return newMonth;
    }

    private nextMonth(count: number): MontthInCarouselBudget[] {
        const newMonth: MontthInCarouselBudget[] = [];
        for (let i = 0; i < count; i++) {
            const month: MontthInCarouselBudget = new MontthInCarouselBudget(
                new Date(this.months[5].date.getFullYear(), this.months[5].date.getMonth() + 1, this.months[5].date.getDate(), 12, 0, 0));
            newMonth.push(month);
            this.months.shift();
            this.months.push(month);
        }
        this.monthSelected = this.months[3].date;
        return newMonth;
    }

    goToDate(monthSelected: Date): MontthInCarouselBudget[] {
        if (monthSelected < this.monthSelected) {
            return this.previousMonth(this.monthBetween(monthSelected, this.monthSelected));
        } else {
            return this.nextMonth(this.monthBetween(this.monthSelected, monthSelected));
        }
    }

    private monthBetween(date1, date2) {
        return ((date2.getFullYear() - date1.getFullYear()) * 12) + (date2.getMonth() - date1.getMonth());
    }

}