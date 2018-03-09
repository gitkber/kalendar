import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database';
import { ImageService } from '../image.service';

@Component({
    selector: 'thumbnail-list',
    templateUrl: './thumbnail-list.component.html',
    styleUrls: ['./thumbnail-list.component.css']
})
export class ThumbnailListComponent implements OnInit {

    public images: FirebaseListObservable<any[]>;

    constructor(private imageService: ImageService) { }

    ngOnInit(): void {
        this.images = this.imageService.getList();
    }

    test(value) {
        console.log('llll', value);
    }

}
