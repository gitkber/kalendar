import { Action } from '../action';

export class Image {
    constructor(
        public user: string,
        public fullPath: string,
        public label: string,
        public kalendarDate: string // yyyy-MM-dd
    ) { }
}

export class ImageAction {
    public imageKey: string;

    constructor(
        public action: Action,
        public image?: Image
    ) {}
}
