import { Type } from "./type";

export class DayItem {

    constructor(
        public type: Type,
        public item: string
    ) {
    }

    isContact():boolean {
        return this.type === Type.CONTACT;
    }
    isLine():boolean {
        return this.type === Type.LINE;
    }

}