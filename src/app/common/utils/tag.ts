/** Holiday */
export enum TagHolidayType {
    PUBLIC = 'PUBLIC', // Jour férié
    SCHOOL = 'SCHOOL',
    CONTACT = 'CONTACT',
}

/** Budget */
export enum TagBudgetOperation {
    MIN = 'MIN',
    PLUS = 'PLUS',
    TO_BUY = 'TO_BUY',
}

/** Budget */
export enum TagBudgetType {
    HOME = 'HOME',
    CAR = 'CAR',
    CLOTHES = 'CLOTHES',
    FOOD = 'FOOD',
    HEALTH = 'HEALTH',
    WORK = 'WORK',
    OTHER = 'OTHER',
}

/** Objective */
export enum TagObjectiveItemType {
    ONCE = 'ONCE',
    DAILY = 'DAILY',
    WEEKLY = 'WEEKLY',
    MONTHLY = 'MONTHLY',
}

export function getTagBudgetTypeImage(tag: string): string {
    switch (tag) {
        case TagBudgetType.HOME:
            return 'fa fa-home';
        case TagBudgetType.CAR:
            return 'fa fa-car';
        case TagBudgetType.CLOTHES:
            return 'fa fa-black-tie';
        case TagBudgetType.FOOD:
            return 'fa fa-glass';
        case TagBudgetType.HEALTH:
            return 'fa fa-medkit';
        case TagBudgetType.WORK:
            return 'fa fa-briefcase';
        case TagBudgetType.OTHER:
            return 'fa fa-circle';
        default:
            return 'fa fa-question-circle-o';
    }
}

export function getTagHolidayTypeImage(tag: string): string {
    switch (tag) {
        case TagHolidayType.PUBLIC:
            return 'fa fa-flag';
        case TagHolidayType.CONTACT:
            return 'fa fa-sun-o';
        case TagHolidayType.SCHOOL:
            return 'fa fa-graduation-cap';
        default:
            return 'fa fa-question-circle-o';
    }
}
