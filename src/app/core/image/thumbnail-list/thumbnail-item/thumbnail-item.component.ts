import { Component, Input, OnInit } from '@angular/core';
import { ImageService } from '../../image.service';

@Component({
    selector: 'thumbnail-item',
    templateUrl: './thumbnail-item.component.html',
    styleUrls: ['./thumbnail-item.component.css']
})
export class ThumbnailItemComponent implements OnInit {

    @Input() label: string;
    @Input() weekNumber: string;
    @Input() year: string;
    @Input() startDate: Date;
    @Input() endDate: Date;
    srcImage: string;

    constructor(private imageService: ImageService) { }

    ngOnInit(): void {
        if (this.label !== undefined) {
            this.imageService.loadThumbnail(this.weekNumber, this.year).then(url => {
                console.log('load' + this.year + '_' + this.weekNumber + '_' + this.label);
                this.srcImage = url;
            }).catch(error => {
                console.error('storage thumb get error', error['code']);
            });

        }
    }

}
