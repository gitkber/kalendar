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
export enum TagObjectiveType {
    OBJ_BY_DAY = 'OBJ_BY_DAY',
    OBJ_ONE_DAY = 'OBJ_ONE_DAY',
    OBJ_BY_WEEK = 'OBJ_BY_WEEK',
    OBJ_BY_MONTH = 'OBJ_BY_MONTH',
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
            return 'fa fa-adn';
    }
}
