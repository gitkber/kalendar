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
    label: string;
    @Input() day: Day;
    @Output() showImageClick: EventEmitter<Day> = new EventEmitter();

    // Upload
    @Output() uploadStatus = new EventEmitter();
    errors: Array<string> = [];
    fileExt: string;
    maxFiles: number;
    maxSize: number; // 5MB

    constructor(private imageService: ImageService) {
        this.fileExt = 'JPG, GIF, PNG';
        this.maxFiles = 1;
        this.maxSize = 5; // 5MB
    }

    ngOnInit(): void {
        this.imageService.getImage(this.day.date).subscribe(success => {
            if (success['$value'] === null) {
                this.label = 'Parcourir';
                this.imageService.loadImageFromStore('img-id');
            } else {
                this.label = success['label'];
                this.imageService.loadImageFromStore('img-id', this.day.date);
            }
        });
    }

    showImage() {
        this.showImageClick.emit(this.day);
    }

    onFileChange(event) {
        const files = event.target.files;
        this.saveFiles(files);
    }

    saveFiles(files) {
        this.errors = []; // Clear error
        // Validate file size and allowed extensions
        if (files.length > 0 && (!this.isValidFiles(files))) {
            this.uploadStatus.emit(false);
            return;
        }
        if (files.length === 1) {
            this.imageService.saveImage('img-id', this.day.date, files[0]);
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
