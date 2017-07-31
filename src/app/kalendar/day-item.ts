import { Type } from './type';

export class DayItem {

    constructor(
        public type: Type,
        public key: string,
        public item: string
    ) {
    }

    isContact(): boolean {
        return this.type === Type.CONTACT;
    }

    isMemo(): boolean {
        return this.type === Type.MEMO;
    }

}
