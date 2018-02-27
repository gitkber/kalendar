import { Action } from '../action';

export class Timeline {
    public spots: Spot[] = [];

    constructor(date: Date) {
        this.spots.push(new Spot(date, false, true));
        let currentMonth: number = date.getMonth();
        for (let index = 0; index <= 30; index++) {
            const dayDate: Date = new Date(date.getFullYear(), date.getMonth(), date.getDate() - index, 12, 0, 0);
            if (dayDate.getMonth() !== currentMonth) {
                this.spots.push(new Spot(dayDate, false, true));
                currentMonth = dayDate.getMonth();
            }
            if (dayDate.getDate() === 5) {
                this.spots.push(new Spot(dayDate, true, false));
            } else {
                this.spots.push(new Spot(dayDate, false, false));
            }

        }
    }
}

export class Spot {
    constructor(public date: Date, public isDone: boolean, public isMonth?: boolean) {}
}

export class SpotAction {
    public objectiveItemKey: string;

    constructor(public action: Action, public spot?: Spot) {}
}
