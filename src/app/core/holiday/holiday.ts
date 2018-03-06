import { Action } from '../action';
import { TagHolidayType } from '../../common/utils/tag';

export class Holiday {
    constructor(
        public tagType: TagHolidayType,
        public description: string,
        public date: string // yyyy-MM-dd
    ) { }
}

export class HolidayAction {
    public datesToAdd: Date[] = [];
    public key: string;

    constructor(
        public action: Action,
        public holiday?: Holiday,
    ) { }
}
