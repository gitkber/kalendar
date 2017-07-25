import { Action } from '../action';

export class LineCriteria {
    public action: Action;
    public duplication: number;
    public includeWeekend: boolean;

    constructor(
        public description: string,
        public kalendarDate: string,
        public lineKey?: string
    ) { }

}
