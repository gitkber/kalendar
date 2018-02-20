import { Type } from './type';

export class DayItem {

    constructor(
        public type: Type,
        public key: string,
        public date: string, // yyyy-MM-dd
        public principalItem: string,
        public additionalItem?: string
    ) {
    }

    isContact(): boolean {
        return this.type === Type.CONTACT;
    }

    isEvent(): boolean {
        return this.type === Type.EVENT;
    }

    isPublicHoliday(): boolean {
        return this.type === Type.PUBLIC_HOLIDAY;
    }

    isSchoolHoliday(): boolean {
        return this.type === Type.SCHOOL_HOLIDAY;
    }

    isContactHoliday() {
        return this.type === Type.CONTACT_HOLIDAY;
    }

    isBudget() {
        return this.type === Type.BUDGET;
    }
}
