export class OneTimeline {
    public monthLines: MonthLine[] = [];

    constructor(
        public description: string,
        public category: string,
        public status: string
    ) { }
}

export class MonthLine {
    public description;
    public days: number[] = [];
    public objectiveLines: ObjectiveLine[] = [];

    constructor(
        public month: number,
        public year: number
    ) {
        this.description = month + ' ' + year;
        const lastDayOfMonth: number = new Date(this.year, this.month, 0).getDate();

        for (let index = 1; index <= lastDayOfMonth; index++) {
            this.days.push(index);
        }
    }
}

export class ObjectiveLine {
    public values: string[] = [];
    public description;

    constructor(
        public month: number,
        public year: number
    ) {
        this.description = month + ' ' + year;
        const lastDayOfMonth: number = new Date(this.year, this.month, 0).getDate();

        for (let index = 1; index <= lastDayOfMonth; index++) {
            this.values.push('');
        }
    }
}
