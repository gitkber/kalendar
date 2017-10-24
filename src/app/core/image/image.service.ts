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

    loadImageFromStore(weekNumber?: number): firebase.Promise<any> {
        let fullPath: string = 'default.jpg'.toString();
        if (weekNumber) {
            fullPath = this.getPathForStorage(weekNumber);
        }
        return firebase.storage().ref().child(fullPath).getDownloadURL();
    }

    getImage(weekNumber: number): Observable<string> {
        return this.db.object('images/' + this.authService.currentUserId + '/' + weekNumber);
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
        this.db.object('images/' + this.authService.currentUserId + '/' + weekNumber).$ref.set({label: label});
    }
}
