import { Pipe, PipeTransform } from '@angular/core';
import { CatchBudget } from '../../catch-all';

@Pipe({
    name: 'groupbytest'
})
export class GroupbyPipe implements PipeTransform {

    transform(value: Array<CatchBudget>, field: string): any {
        console.log('field', field);
        console.log('value', value.length);
        const groupedObj = value.reduce((prev, cur) => {
            console.log(prev, cur);
            // if (!prev[cur[field]]) {
            //     prev[cur[field]] = [cur];
            // } else {
            //     prev[cur[field]].push(cur);
            // }
            return prev;
        }, {});
        // return Object.keys(groupedObj).map(key => ({key, value: groupedObj[key]}));
        return Object.keys(groupedObj).map(key => {
            console.log('key', key);
            return key;
        });
        // const groupedObj = value.reduce((prev, cur) => {
        //     console.log(prev, cur);
        //     if (!prev[cur[field]]) {
        //         prev[cur[field]] = [cur];
        //     } else {
        //         prev[cur[field]].push(cur);
        //     }
        //     return prev;
        // }, {});
        // return Object.keys(groupedObj).map(key => ({key, value: groupedObj[key]}));
    }

    /*
        employees = [
            { id: 1, firstName: "John", lastName: "Sonmez", department: 1, age: 24, address: "24/7, Working hours apartment, Cal. US", contactNumber: "+968546215789" },
            { id: 2, firstName: "Mark", lastName: "Seaman", department: 2, age: 25, address: "32-C, Happy apartments, Block-9C, Cal. US", contactNumber: "+968754216984" },
            { id: 3, firstName: "Jamie", lastName: "King", department: 3, age: 32, address: "54/II, Glorydale apartment, Cal. US", contactNumber: "+967421896326" },

            { id: 5, firstName: "Jacob", lastName: "Ridley", department: 5, age: 24, address: "24/7, Working hours apartment, Cal. US", contactNumber: "+968546215789" },
            { id: 6, firstName: "Peter", lastName: "Parker", department: 3, age: 25, address: "32-C, Happy apartments, Block-9C, Cal. US", contactNumber: "+968754216984" },
            { id: 7, firstName: "Martin", lastName: "Luther", department: 4, age: 32, address: "54/II, Glorydale apartment, Cal. US", contactNumber: "+967421896326" },
            { id: 8, firstName: "Raghav", lastName: "Kumar", department: 1, age: 34, address: "51/C Shivalik, Cal. US", contactNumber: "+967842569842" },

            { id: 9, firstName: "Narayan", lastName: "Sonmez", department: 3, age: 24, address: "24/7, Working hours apartment, Cal. US", contactNumber: "+968546215789" },
            { id: 10, firstName: "Russell", lastName: "Andre", department: 2, age: 25, address: "32-C, Happy apartments, Block-9C, Cal. US", contactNumber: "+968754216984" },
            { id: 11, firstName: "Ramona", lastName: "King", department: 4, age: 32, address: "54/II, Glorydale apartment, Cal. US", contactNumber: "+967421896326" },
            { id: 12, firstName: "Andre", lastName: "Russell", department: 1, age: 34, address: "51/C Shivalik, Cal. US", contactNumber: "+967842569842" },

            { id: 13, firstName: "Nathan", lastName: "Leon", department: 1, age: 24, address: "24/7, Working hours apartment, Cal. US", contactNumber: "+968546215789" },
            { id: 14, firstName: "Brett", lastName: "Lee", department: 5, age: 25, address: "32-C, Happy apartments, Block-9C, Cal. US", contactNumber: "+968754216984" },
            { id: 15, firstName: "Tim", lastName: "Cook", department: 2, age: 32, address: "54/II, Glorydale apartment, Cal. US", contactNumber: "+967421896326" },
            { id: 16, firstName: "Steve", lastName: "Jobs", department: 5, age: 34, address: "51/C Shivalik, Cal. US", contactNumber: "+967842569842" }
        ];
        */
}
