import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable()
export class DateUtilService {

    private datePipe: DatePipe = new DatePipe(this._locale);

    constructor(@Inject(LOCALE_ID) private _locale: string) { }

    toString(date: Date): string {
        return this.datePipe.transform(date, 'yyyy-MM-dd')
    }

    toYYYY(date: Date): string {
        return this.datePipe.transform(date, 'yyyy')
    }

    stringToDayAndLongMonth(dateString: string): string {
        const date: Date = new Date(dateString);
        return this.datePipe.transform(date, 'dd MMMM')
    }

    // countWeekendDays(startDate: Date, endDate: Date): number {
    //     const ndays = 1 + Math.round((endDate.getTime() - startDate.getTime()) / (24 * 3600 * 1000));
    //     const nsaturdays = Math.floor((startDate.getDay() + ndays) / 7);
    //     return 2 * nsaturdays + (startDate.getDay() === 0 ? 1 : 0) - (endDate.getDay() === 6 ? 1 : 0);
    // }

    replaceYear(year: string, dateString: string): string {
        const date: Date = new Date(dateString);
        date.setFullYear(parseInt(year, 10));
        return this.toString(date);
    }
}
