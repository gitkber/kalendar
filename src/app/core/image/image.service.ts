import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../service/auth.service';
import { DateUtilService } from '../../common/utils/date-util.service';

@Injectable()
export class ImageService {

    private path: string;
    private firebaseListObservable: FirebaseListObservable<any[]>;

    constructor(public db: AngularFireDatabase, public authService: AuthService, public dateUtilService: DateUtilService) {
        this.path = '/images/' + this.authService.currentUserId + '/';
        this.firebaseListObservable = this.db.list(this.path);
    }

    getAlbum(): any {
        const weeks = [];
        const today = new Date();
        const currentWeekDay = today.getDay();
        const lessDays = currentWeekDay === 0 ? 6 : currentWeekDay - 1;

        let weekStart = this.getStart(today, lessDays);
        for (let i = 0; i < 15; i++) {
            const weekEnd = this.getEnd(weekStart);
            const weekNumber = this.getWeek(weekStart);
            weeks.push({weekNumber: weekNumber, startDate: weekStart, endDate: weekEnd});
            console.log(weekNumber, weekStart.toDateString() + ' ' + weekEnd.toDateString());
            weekStart = new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() - 7);
        }

        return this.firebaseListObservable.map(
            items => items
                .reduce((accumulator, currentValue) => {
                    const index = accumulator.findIndex(v => v.weekNumber + '' === currentValue['$key']);
                    if (index !== -1) {
                        accumulator[index].label = currentValue.label;

                    }
                    return accumulator;
                }, weeks));
    }

    private getStart(date: Date, startDay): Date {
        return new Date(date.getTime() - 60 * 60 * 24 * startDay * 1000);
    }

    private getEnd(date: Date, startDay = 1): Date {
        return new Date(date.getTime() + 60 * 60 * 24 * 6 * 1000);
    }

    private getWeek(date: Date): number {
        const onejan = new Date(date.getFullYear(), 0, 1);
        return Math.ceil((((date.getTime() - onejan.getTime()) / 86400000) + onejan.getDay()) / 7);
    }

    loadImageFromStore(weekNumber?: number): firebase.Promise<any> {
        let fullPath: string = 'default.jpg'.toString();
        if (weekNumber) {
            fullPath = this.getPathForStorage(weekNumber);
        }
        return firebase.storage().ref().child(fullPath).getDownloadURL();
    }

    loadThumbnail(weekNumber: string): firebase.Promise<any> {
        return firebase.storage().ref().child(this.authService.currentUserId + '/' + 'thumb_' + weekNumber + '.jpg').getDownloadURL();
    }

    getImage(weekNumber: number): Observable<string> {
        return this.db.object(this.path + weekNumber);
    }

    getPathForStorage(weekNumber: number): string {
        return this.authService.currentUserId + '/' + weekNumber + '.jpg';
    }

    saveImage(weekNumber: number, file): firebase.Promise<any> {
        const filename = file.name.toUpperCase().split('.').reverse().pop();
        this.saveLabel(weekNumber, filename);

        return firebase.storage().ref().child(this.getPathForStorage(weekNumber)).put(file)
    }

    saveLabel(weekNumber: number, label: string) {
        this.db.object(this.path + weekNumber).$ref.set({label: label});
    }
}
