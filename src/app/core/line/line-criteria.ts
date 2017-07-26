import { Action } from '../action';

export class LineCriteria {
    public action: Action;

    constructor(
        public description: string,
        public kalendarDate: string,
        public lineKey?: string,
        public duplication: number = 0,
        public includeWeekend: boolean = false
    ) { }

}
