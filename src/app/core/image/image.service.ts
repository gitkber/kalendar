import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../service/auth.service';
import { DateUtilService } from '../service/date-util.service';

@Injectable()
export class ImageService {

    constructor(public db: AngularFireDatabase, public authService: AuthService, public dateUtilService: DateUtilService) { }

    loadImageFromStore(date?: Date): firebase.Promise<any> {
        let fullPath: string = 'default.jpg'.toString();
        if (date) {
            fullPath = this.getPathForStorage(date);
        }
        return firebase.storage().ref().child(fullPath).getDownloadURL();
    }

    getImage(date: Date): Observable<string> {
        const dateFormatted: string = this.dateUtilService.toString(date);
        return this.db.object('images/' + this.authService.currentUserId + '/' + dateFormatted);
    }

    getPathForStorage(date: Date): string {
        const dateFormatted: string = this.dateUtilService.toString(date);
        return this.authService.currentUserId + '/' + dateFormatted + '.jpg';
    }

    saveImage(date: Date, file): firebase.Promise<any> {
        const filename = file.name.toUpperCase().split('.').reverse().pop();
        this.saveLabel(date, filename);

        return firebase.storage().ref().child(this.getPathForStorage(date)).put(file)
    }

    saveLabel(date: Date, label: string) {
        const dateFormatted: string = this.dateUtilService.toString(date);
        this.db.object('images/' + this.authService.currentUserId + '/' + dateFormatted).$ref.set({label: label});
    }
}
