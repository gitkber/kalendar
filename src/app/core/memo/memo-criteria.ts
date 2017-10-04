import { Action } from '../action';

export class MemoCriteria {

    public action: Action;
    public datesToAdd: Date[] = [];

    constructor(
        public description: string,
        public kalendarDate: string,
        public memoKey?: string
    ) { }

}
