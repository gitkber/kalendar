import { Line } from './line';
import { Action } from '../action';

export class LineAction {
    public lineKey: string;

    constructor(
        public action: Action,
        public line?: Line
    ) { }

}
