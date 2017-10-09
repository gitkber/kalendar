import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { QueryReference } from 'angularfire2/interfaces';
import { AuthService } from '../service/auth.service';
import { DateUtilService } from '../service/date-util.service';
import { Action } from '../action';
import { Image, ImageAction } from './image';

@Injectable()
export class ImageService {

    private imagesObservable: FirebaseListObservable<Image[]>;

    constructor(public db: AngularFireDatabase, public authService: AuthService, public dateUtilService: DateUtilService) {
        this.imagesObservable = this.db.list('/images', {
            query: {
                orderByChild: 'user',
                equalTo: this.authService.currentUserId
            }
        });
    }

    getList(): FirebaseListObservable<Image[]> { return this.imagesObservable }

    getRef(): QueryReference {
        return this.imagesObservable.$ref.orderByChild('user').equalTo(this.authService.currentUserId);
    }

    doActionOnMemo(event: ImageAction) {
        if (event.action === Action.INSERT) {
            event.image.user = this.authService.currentUserId;
            this.imagesObservable.push(event.image);
        } else if (event.action === Action.UPDATE) {
            this.imagesObservable.update(event.imageKey, event.image);
        } else if (event.action === Action.DELETE) {
            this.imagesObservable.remove(event.imageKey);
        }
    }

}
