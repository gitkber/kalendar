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
        this.isOpen = true;
        this.imageService.getImage(this.date).subscribe(success => {
            if (success['$value'] === null) {
                this.label = 'Parcourir';
                this.isModified = true;
                this.loadImageFromStore();
            } else {
                this.label = success['label'];
                this.isModified = false;
                this.loadImageFromStore(date);
            }
        });
    }

    private loadImageFromStore(date?: Date) {
        this.imageService.loadImageFromStore(date).then(url => {
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
        this.imageService.saveLabel(this.date, this.label);
        this.isModified = true;
    }

}
