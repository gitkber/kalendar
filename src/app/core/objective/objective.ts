import { Action } from '../action';

export class Objective {
    public todos: Todo[] = [];

    constructor(
        public description: string,
        public tags: string
    ) { }
}

export class Todo {
    constructor(
        public todoType: TodoType,
        public description: string
    ) { }
}

export enum TodoType {
    OBJ_BY_DAY = 'OBJ_BY_DAY',
    OBJ_ONE_DAY = 'OBJ_ONE_DAY',
    OBJ_BY_WEEK = 'OBJ_BY_WEEK',
    OBJ_BY_MONTH = 'OBJ_BY_MONTH',
}

export class ObjectiveAction {
    public key: string;

    constructor(
        public action: Action,
        public objective?: Objective
    ) { }
}
