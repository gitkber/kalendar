export class OneTimeline {
    public objectiveLines: ObjectiveLine[] = [];

    constructor(
        public description: string
        // public category: string,
        // public status: string
    ) { }
}

export class ObjectiveLine {
    public monthLines: MonthLine[] = [];

    constructor(
        public type: string,
        public description: string
        // public status: string
    ) {
        let currentDate: Date = new Date();

        for (let index = 1; index <= 3; index++) {
            this.monthLines.push(new MonthLine(currentDate));
            currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
        }
    }
}

export class MonthLine {
    public dayOfLines: DayOfLine[] = [];

    constructor(
        public date: Date
    ) {
        const lastDayOfMonth: number = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

        for (let index = 1; index <= lastDayOfMonth; index++) {
            this.dayOfLines.push(new DayOfLine(index));
        }
    }
}

export class DayOfLine {
    public status: string;

    constructor(public day: number) {}
}
