import { Type } from './type';

export class DayItem {

    constructor(
        public type: Type,
        public key: string,
        public principalItem: string,
        public additionalItem?: string
    ) {
    }

    isContact(): boolean {
        return this.type === Type.CONTACT;
    }

    isMemo(): boolean {
        return this.type === Type.MEMO;
    }

    isPublicHoliday(): boolean {
        return this.type === Type.PUBLIC_HOLIDAY;
    }

    isContactHoliday() {
        return this.type === Type.CONTACT_HOLIDAY;
    }
}
