export class Timeline {
    public objectives: Objective[] = [];

    constructor(
        public description: string,
        public category: string,
        public status: string
    ) { }
}

export class Objective {
    public occurences: Occurence[] = [];
    constructor(
        public type: string,
        public description: string,
        public status: string
    ) { }
}

export class Occurence {
    constructor(
        public kalendarDate: string,
        public status: string
    ) { }
}
