import { Action } from '../action';
import { Memo } from './memo';

export class MemoAction {

    public datesToAdd: Date[] = [];
    public memoKey: string;

    constructor(
        public action: Action,
        public memo?: Memo
    ) {}

}
