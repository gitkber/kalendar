import { DayItem } from '../day-item';

export class Day {

    public day: number;
    public dayItems: DayItem[] = [];

    public isDisabled: boolean;
    public isWeekend: boolean;
    public isToday: boolean;
    public isSelected: boolean;

    constructor(
        public date: Date,
        private today?: Date
    ) {
        this.day = date.getDate();

        this.isWeekend = ((date.getDay() === 6) // 6 = Saturday
            || (date.getDay() === 0));          // 0 = Sunday

        if (!today) {
            this.isDisabled = true;
        } else {
            this.isToday = (today.getDate() === date.getDate()
                && today.getMonth() === date.getMonth()
                && today.getFullYear() === date.getFullYear());
        }
    }

}
