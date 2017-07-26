import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable()
export class DateUtilService {

    private datePipe: DatePipe = new DatePipe(this._locale);

    constructor(@Inject(LOCALE_ID) private _locale: string) { }

    toString(date: Date): string {
        return this.datePipe.transform(date, 'yyyy-MM-dd')
    }

}
