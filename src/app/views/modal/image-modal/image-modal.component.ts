import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Day } from '../../../kalendar/day/day';
import { ImageService } from '../../../core/image/image.service';

@Component({
    selector: 'image-modal',
    templateUrl: './image-modal.component.html',
    styleUrls: ['./image-modal.component.css']
})
export class ImageModalComponent implements OnInit {

    @Input() blocking = false;

    public isOpen = false;
    public day: Day;
    public label: string;

    constructor(private imageService: ImageService) {
        console.log('ImageModalComponent');
    }

    ngOnInit() { }

    @HostListener('document:keydown.escape', ['$event'])
    onKeydownHandler(event: KeyboardEvent) {
        console.log('escape', event);
        this.close();
    }

    open(day: Day): void {
        this.isOpen = true;
        this.day = day;
        this.imageService.getImage(this.day.date).subscribe(success => {
            if (success['$value'] === null) {
                this.label = 'Parcourir';
                this.imageService.loadImageFromStore('img-item-id');
            } else {
                this.label = success['label'];
                this.imageService.loadImageFromStore('img-item-id', this.day.date);
            }
        });
    }

    close(checkBlocking = false): void {
        if (checkBlocking && this.blocking) {
            return;
        }
        this.isOpen = false;
    }

}
