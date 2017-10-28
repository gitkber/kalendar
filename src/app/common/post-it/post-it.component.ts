import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'post-it',
    templateUrl: './post-it.component.html',
    styleUrls: ['./post-it.component.css']
})

export class PostItComponent implements OnInit {

    /*reference */
    @Input() reference: string;
    /* Output */
    @Output() closed = new EventEmitter();

    isVisible = true;
    rotation: string;
    color = '#fefabc';

    private colors = ['#fefabc', '#f7f2a2', '#a2c0f7', '#ffb4b4', '#ffc6c6', '#b7f7a2', '#bad0f9', '#9cf57f'];

    ngOnInit() {
        this.rotation = 'rotate(' + Math.floor((Math.random() * 20) + 1 - 10) + 'deg)';
        this.color = this.colors[Math.floor((Math.random() * this.colors.length))];
    }

    close() {
        this.isVisible = false;
        this.closed.emit();
    }
}
