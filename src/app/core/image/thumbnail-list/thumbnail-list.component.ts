import { Component, OnInit } from '@angular/core';
import { ImageService } from '../image.service';

@Component({
    selector: 'thumbnail-list',
    templateUrl: './thumbnail-list.component.html',
    styleUrls: ['./thumbnail-list.component.css']
})
export class ThumbnailListComponent implements OnInit {

    public images: any[] = [];

    constructor(private imageService: ImageService) { }

    ngOnInit(): void {
        this.images = this.imageService.getAlbum()
    }
}
