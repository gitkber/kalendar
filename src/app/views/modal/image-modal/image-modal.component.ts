import { Component, HostListener, Input } from '@angular/core';
import { ImageService } from '../../../core/image/image.service';

@Component({
    selector: 'image-modal',
    templateUrl: './image-modal.component.html',
    styleUrls: ['./image-modal.component.css']
})
export class ImageModalComponent {

    @Input() blocking = false;

    public isOpen = false;
    public date: Date;
    private weekNumber: number;
    public label: string;
    public isModified: boolean;

    constructor(private imageService: ImageService) {
        console.log('ImageModalComponent');
    }

    @HostListener('document:keydown.escape', ['$event'])
    onKeydownHandler(event: KeyboardEvent) {
        console.log('escape', event);
        this.close();
    }

    open(date: Date): void {
        this.date = date;
        this.weekNumber = this.getWeek(this.date);
        this.isOpen = true;
        this.imageService.getImage(this.weekNumber).subscribe(success => {
            if (success['$value'] === null) {
                this.label = 'Parcourir';
                this.isModified = true;
                this.loadImageFromStore();
            } else {
                this.label = success['label'];
                this.isModified = false;
                this.loadImageFromStore(this.weekNumber);
            }
        });
    }

    private getWeek(date: Date): number {
        const onejan = new Date(date.getFullYear(), 0, 1);
        return Math.ceil((((date.getTime() - onejan.getTime()) / 86400000) + onejan.getDay()) / 7);
    };

    private loadImageFromStore(weekNumber?: number) {
        this.imageService.loadImageFromStore(weekNumber).then(url => {
            document.getElementById('img-item-id').setAttribute('src', url);
        }).catch(error => {
            console.error('storage get error', error['code']);
        });
    }

    close(checkBlocking = false): void {
        if (checkBlocking && this.blocking) {
            return;
        }
        this.isOpen = false;
    }

    onInputChange(event) {
        this.label = event.target.value;
    }

    modifyLabel() {
        this.imageService.saveLabel(this.weekNumber, this.label);
        this.isModified = true;
    }

}
