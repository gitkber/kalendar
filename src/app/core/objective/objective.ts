import { Action } from '../action';
import { TagObjectiveType } from '../../common/utils/tag';

export class Objective {
    public details: ObjectiveDetail[] = [];

    constructor(
        public description: string,
        public tags: string
    ) { }
}

export class ObjectiveDetail {
    constructor(
        public tagType: TagObjectiveType,
        public description: string
    ) { }
}

export class ObjectiveAction {
    public key: string;

    constructor(
        public action: Action,
        public objective?: Objective
    ) { }
}
