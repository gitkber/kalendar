import { Component, Input, OnInit } from '@angular/core';
import { ImageService } from '../../image.service';

@Component({
    selector: 'thumbnail-item',
    templateUrl: './thumbnail-item.component.html',
    styleUrls: ['./thumbnail-item.component.css']
})
export class ThumbnailItemComponent implements OnInit {

    @Input() label: string;
    @Input() key: string;
    srcImage: string;

    constructor(private imageService: ImageService) { }

    ngOnInit(): void {
        this.imageService.loadThumbnail(this.key).then(url => {
            this.srcImage = url;
        }).catch(error => {
            console.error('storage thumb get error', error['code']);
        });

    }

}
