import { Action } from '../action';

export class Memo {
    constructor(
        public user: string,
        public description: string,
        public kalendarDate: string // yyyy-MM-dd
    ) { }
}

export class MemoAction {
    public datesToAdd: Date[] = [];
    public memoKey: string;

    constructor(
        public action: Action,
        public memo?: Memo
    ) {}
}
