export class Navigation {

    public isToday: boolean;
    public isNext: boolean;
    public isPrevious: boolean;
    public isMonth: boolean;
    public isYear: boolean;
    public toDate: Date;

    constructor(
        public navigation: string,
    ) {
    }

}
