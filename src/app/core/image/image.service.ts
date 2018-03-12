import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../service/auth.service';
import { DateUtilService } from '../../common/utils/date-util.service';

@Injectable()
export class ImageService {

    private pathWeeks: string;
    private pathStorageWeeks: string;
    private firebaseListObservable: FirebaseListObservable<any[]>;

    private weeks = [];
    private weekStart: Date;

    constructor(public db: AngularFireDatabase, public authService: AuthService, public dateUtilService: DateUtilService) {
        this.pathStorageWeeks = this.authService.currentUserId + '/weeks/';
        this.pathWeeks = '/images/' + this.pathStorageWeeks;
        this.firebaseListObservable = this.db.list(this.pathWeeks);

        const today = new Date();
        const lessDays = today.getDay() === 0 ? 6 : today.getDay() - 1;
        this.weekStart = this.getStart(today, lessDays);
    }

    getAlbum(): any {
        for (let i = 0; i < 15; i++) {
            const weekEnd = this.getEnd(this.weekStart);
            const weekNumber = this.getWeek(this.weekStart);
            const year = this.weekStart.getFullYear();
            this.weeks.push({weekNumber: weekNumber, year: year, startDate: this.weekStart, endDate: weekEnd});
            console.log(weekNumber, this.weekStart.toDateString() + ' ' + weekEnd.toDateString());
            this.weekStart = new Date(this.weekStart.getFullYear(), this.weekStart.getMonth(), this.weekStart.getDate() - 7);
        }
        return this.firebaseListObservable.map(
            items => items
                .reduce((accumulator, currentValue) => {
                    const index = accumulator.findIndex(v => v.year + '_' + v.weekNumber === currentValue['$key']);
                    if (index !== -1) {
                        accumulator[index].label = currentValue.label;
                    }
                    return accumulator;
                }, this.weeks));
    }

    private getStart(date: Date, startDay): Date {
        return new Date(date.getTime() - 60 * 60 * 24 * startDay * 1000);
    }

    private getEnd(date: Date, startDay = 1): Date {
        return new Date(date.getTime() + 60 * 60 * 24 * 6 * 1000);
    }

    private getWeek(date: Date): number {
        const d = new Date(+date);
        d.setHours(0, 0, 0);
        d.setDate(d.getDate() + 4 - (d.getDay() || 7));
        return Math.ceil((((d.getTime() - new Date(d.getFullYear(), 0, 1).getTime()) / 8.64e7) + 1) / 7);
    };

    loadImageFromStore(weekNumber?: number, year?: number): firebase.Promise<any> {
        let fullPath: string = 'default.jpg'.toString();
        if (weekNumber) {
            fullPath = this.getPathForStorage(weekNumber, year);
        }
        return firebase.storage().ref().child(fullPath).getDownloadURL();
    }

    loadThumbnail(weekNumber: string, year: string): firebase.Promise<any> {
        return firebase.storage().ref().child(
            this.pathStorageWeeks + 'thumb_' + year + '_' + weekNumber + '.jpg').getDownloadURL();
    }

    getImage(weekNumber: number, year: number): Observable<string> {
        return this.db.object(this.pathWeeks + year + '_' + weekNumber);
    }

    getPathForStorage(weekNumber: number, year: number): string {
        return this.pathStorageWeeks + year + '_' + weekNumber + '.jpg';
    }

    saveImage(weekNumber: number, year: number, file): firebase.Promise<any> {
        const filename = file.name.toUpperCase().split('.').reverse().pop();
        this.saveLabel(weekNumber, year, filename);

        return firebase.storage().ref().child(this.getPathForStorage(weekNumber, year)).put(file)
    }

    saveLabel(weekNumber: number, year: number, label: string) {
        this.db.object(this.pathWeeks + year + '_' + weekNumber).$ref.set({label: label});
    }
}
