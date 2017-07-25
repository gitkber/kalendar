import { Action } from '../action';

export class LineCriteria {

    constructor(
        public action: Action,
        public description: string,
        public kalendarDate: string,
        public duplication: number,
        public includeWeekend: boolean,
        public lineKey?: string
    ) { }

}
