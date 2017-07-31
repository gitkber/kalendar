import { Action } from '../action';

export class MemoCriteria {
    public action: Action;

    constructor(
        public description: string,
        public kalendarDate: string,
        public memoKey?: string,
        public duplication: number = 0,
        public includeWeekend: boolean = false
    ) { }

}
