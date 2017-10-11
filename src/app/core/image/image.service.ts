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

    loadImageFromStore(imageId: string, date?: Date) {
        let fullPath: string = 'default.jpg'.toString();
        if (date) {
            fullPath = this.getPathForStorage(date);
        }
        const storageRef = firebase.storage().ref().child(fullPath);
        storageRef.getDownloadURL().then(url => {
            document.getElementById(imageId).setAttribute('src', url);
        }).catch(error => {
            console.error('storage get error', error['code']);
        });
    }

    getImage(date: Date): Observable<string> {
        const dateFormatted: string = this.dateUtilService.toString(date);
        return this.db.object('images/' + this.authService.currentUserId + '/' + dateFormatted);
    }

    getPathForStorage(date: Date): string {
        const dateFormatted: string = this.dateUtilService.toString(date);
        return this.authService.currentUserId + '/' + dateFormatted + '.jpg';
    }

    saveImage(imageId: string, date: Date, file) {
        const filename = file.name.toUpperCase().split('.').reverse().pop();
        const dateFormatted: string = this.dateUtilService.toString(date);
        this.db.object('images/' + this.authService.currentUserId + '/' + dateFormatted).$ref.set({label: filename});

        firebase.storage().ref().child(this.getPathForStorage(date)).put(file).then(success => {
            document.getElementById(imageId).setAttribute('src', success.downloadURL);
        }).catch(error => {
            console.error('storage put error', error);
        });
    }
}
