import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'dateString'
})
export class DateStringPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        if (!value) {
            return '';
        }
        if (args) {
            const dateItems = value.substring(0, 10).split('/');
            return dateItems[2] + '-' + dateItems[1] + '-' + dateItems[0];
        }
        const dateItems = value.substring(0, 10).split('-');
        return dateItems[2] + '/' + dateItems[1] + '/' + dateItems[0];
    }

}
