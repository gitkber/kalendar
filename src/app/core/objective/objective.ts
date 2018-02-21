import { Action } from '../action';
import { TagObjectiveItemType } from '../../common/utils/tag';
import { Observable } from 'rxjs/Observable';

export class Objective {
    // public items: Observable<ObjectiveItem[]>;
    public items: ObjectiveItem[] = [];

    constructor(
        public description: string
    ) { }
}

export class ObjectiveItem {
    constructor(
        public tagType: TagObjectiveItemType,
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

export class ObjectiveItemAction {
    public key: string;

    constructor(
        public action: Action,
        public objectiveKey: string,
        public objectiveItem?: ObjectiveItem
    ) { }
}
