import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ImageService } from '../../core/image/image.service';
import { Day } from '../day/day';

@Component({
    selector: 'week-image',
    templateUrl: './week-image.component.html',
    styleUrls: ['./week-image.component.css']
})
export class WeekImageComponent implements OnInit {

    // Image
    public label: string;
    @Input() day: Day;
    @Output() showImageClick: EventEmitter<Day> = new EventEmitter();

    // Upload
    @Output() uploadStatus = new EventEmitter();
    public errors: string[] = [];
    public maxFiles: number = 1;
    private maxSize: number = 5; // 5MB
    private fileExt: string = 'JPG, GIF, PNG';

    constructor(private imageService: ImageService) { }

    ngOnInit(): void {
        this.imageService.getImage(this.day.date).subscribe(success => {
            if (success['$value'] === null) {
                this.loadImageFromStore();
                this.label = 'Parcourir';
            } else {
                this.loadImageFromStore(this.day.date);
                this.label = success['label'];
            }
        });
    }

    private loadImageFromStore(date?: Date) {
        this.imageService.loadImageFromStore(date).then(url => {
            document.getElementById('img-id').setAttribute('src', url);
            document.images['img-id'].onload = function() {
                // console.log('dimension', document.images['img-id'].naturalWidth + ' ' + document.images['img-id'].naturalHeight)
                if (document.images['img-id'].naturalWidth > document.images['img-id'].naturalHeight) {
                    // console.log('landscape')
                    document.getElementById('img-id').setAttribute('class', 'image-item-landscape');
                    document.getElementById('kal-polaroid-container-id').setAttribute('style', 'width: 100%;');
                } else {
                    // console.log('portrait')
                    document.getElementById('img-id').setAttribute('class', 'image-item-portrait');
                    document.getElementById('kal-polaroid-container-id').setAttribute('style', 'height: 100%; width: inherit;');
                }
            };
        }).catch(error => {
            console.error('storage get error', error['code']);
        });
    }

    showImage() {
        this.showImageClick.emit(this.day);
    }

    onFileChange(event) {
        this.saveFiles(event.target.files);
    }

    saveFiles(files) {
        this.errors = []; // Clear error
        // Validate file size and allowed extensions
        if (files.length > 0 && (!this.isValidFiles(files))) {
            this.uploadStatus.emit(false);
        } else {
            if (files.length === 1) {
                this.imageService.saveImage(this.day.date, files[0]).then(success => {
                    document.getElementById('img-id').setAttribute('src', success.downloadURL);
                }).catch(error => {
                    console.error('storage put error', error);
                });
            } else {
                console.error('more than one files to upload');
            }
        }
    }

    private isValidFiles(files) {
        // Check Number of files
        if (files.length > this.maxFiles) {
            this.errors.push('Error: At a time you can upload only ' + this.maxFiles + ' files');
            return;
        }
        this.isValidFileExtension(files);
        return this.errors.length === 0;
    }

    private isValidFileExtension(files) {
        // Make array of file extensions
        const extensions = (this.fileExt.split(','))
            .map(function (x) { return x.toLocaleUpperCase().trim() });
        for (let i = 0; i < files.length; i++) {
            // Get file extension
            const ext = files[i].name.toUpperCase().split('.').pop() || files[i].name;
            // Check the extension exists
            const exists = extensions.includes(ext);
            if (!exists) {
                this.errors.push('Error (Extension): ' + files[i].name);
            }
            // Check file size
            this.isValidFileSize(files[i]);
        }
    }

    private isValidFileSize(file) {
        const fileSizeinMB = file.size / (1024 * 1000);
        const size = Math.round(fileSizeinMB * 100) / 100; // convert upto 2 decimal place
        if (size > this.maxSize) {
            this.errors.push('Error (File Size): ' + file.name + ': exceed file size limit of ' + this.maxSize + 'MB ( ' + size + 'MB )');
        }
    }

}
