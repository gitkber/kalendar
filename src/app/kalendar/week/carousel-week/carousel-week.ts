import { Day } from '../../day/day';

export class CarouselWeek {

    public days: Day[] = [];
    private today: Date;
    private dateSelected: Date;

    constructor(
        private date: Date
    ) {
        this.dateSelected = date;
        this.today = new Date();
        this.initWeekAndCreateDays(this.date);
    }

    private initWeekAndCreateDays(date: Date) {
        this.days = [];
        for (let i = 3; i > 0; i--) {
            const currentDate: Date = new Date(date.getFullYear(), date.getMonth(), date.getDate() - i);
            this.days.push(new Day(currentDate, this.today));
        }
        for (let i = 0; i <= 4; i++) {
            const currentDate: Date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + i);
            this.days.push(new Day(currentDate, this.today));
        }
    }

    selectDate(date: Date): Day {
        let day: Day = null;
        this.days.forEach(d => {
            if (d.date !== undefined) {
                if (d.date.getDate() === date.getDate()
                    && d.date.getMonth() === date.getMonth()
                    && d.date.getFullYear() === date.getFullYear()) {
                    d.isSelected = true;
                    day = d;
                } else {
                    d.isSelected = false
                }
            }
        });
        return day;
    }

    goToday(): Day[] {
        this.initWeekAndCreateDays(new Date());
        return this.days;
    }

    next(): Day[] {
        return this.nextDays(7);
    }

    private nextDays(count: number): Day[] {
        for (let i = 0; i < count; i++) {
            const currentDate: Date = new Date(this.days[7].date.getFullYear(), this.days[7].date.getMonth(), this.days[7].date.getDate() + 1);
            this.days.shift();
            this.days.push(new Day(currentDate, this.today));
        }
        this.dateSelected = this.days[4].date;
        return this.days;
    }
    
    previous(): Day[] {
        return this.previousDays(7);
    }

    private previousDays(count: number): Day[] {
        for (let i = 0; i < count; i++) {
            const currentDate: Date = new Date(this.days[0].date.getFullYear(), this.days[0].date.getMonth(), this.days[0].date.getDate() - 1);
            this.days.pop();
            this.days.unshift(new Day(currentDate, this.today));
        }
        this.dateSelected = this.days[4].date;
        return this.days;
    }

    test(dateClicked: Date) {
        console.log('date clicked', dateClicked);
        console.log('date selected', this.dateSelected);
        //let count = this.days_between(dateClicked, this.dateSelected);
        //console.log('diff', count);

        if (dateClicked < this.dateSelected) {
            let count = this.days_between(this.dateSelected, dateClicked) - 1;
            console.log('diff', count);
            this.previousDays(count);
        } else {
            let count = this.days_between(dateClicked, this.dateSelected) + 1;
            console.log('diff', count);
            this.nextDays(count);
        }
    }

    days_between(date1, date2) {
        // The number of milliseconds in one day
        let ONE_DAY = 1000 * 60 * 60 * 24

        // Convert both dates to milliseconds
        var date1_ms = date1.getTime()
        var date2_ms = date2.getTime()

        // Calculate the difference in milliseconds
        var difference_ms = Math.abs(date1_ms - date2_ms)

        // Convert back to days and return
        return Math.round(difference_ms / ONE_DAY)
    }
}
