import { Component, EventEmitter, Inject, Input, Output, Renderer2 } from '@angular/core';
import { Day } from '../../day/day';
import { Navigation } from '../../navigation';
import { CarouselWeek } from './carousel-week';
import { DOCUMENT } from '@angular/common';

@Component({
    selector: 'carousel-week',
    templateUrl: './carousel-week.component.html',
    styleUrls: ['./carousel-week.component.css']
})
export class CarouselWeekComponent {

    @Input() carouselWeek: CarouselWeek;
    @Input() navigation: string; // year - month - day
    @Output() showDayDetailClick: EventEmitter<Day> = new EventEmitter();
    @Output() navigateClick: EventEmitter<Navigation> = new EventEmitter();
    public directory: string;

    constructor(@Inject(DOCUMENT) renderer: Renderer2) {
        this.directory = 'todo';
    }

    navigateToMonth(event: Date) {
        const navigation: Navigation = new Navigation(this.navigation);
        navigation.isMonth = true;
        navigation.toDate = event;
        this.navigateClick.emit(navigation);
    }

    navigateToYear(event: Date) {
        const navigation: Navigation = new Navigation(this.navigation);
        navigation.isYear = true;
        navigation.toDate = event;
        this.navigateClick.emit(navigation);
    }

    navigate(event: Navigation) {
        this.navigateClick.emit(event);
    }

    test() {
        // this.navigateClick.emit(event);
        document.getElementById('prevId').setAttribute('class', 'prevLeftSecond');


        document.getElementById('prevId').setAttribute('class', 'prevLeftSecond');
        document.getElementById('selectedId').setAttribute('class', 'prev');
        document.getElementById('nextId').setAttribute('class', 'selected');
        document.getElementById('nextRightSecondId').setAttribute('class', 'next');
        document.getElementById('prevLeftSecondId').setAttribute('class', 'nextRightSecond');
    }

    // function moveToSelected(element) {
    //     if (element == "next") {
    //         var selected = $(".selected").next();
    //     } else if (element == "prev") {
    //         var selected = $(".selected").prev();
    //     } else {
    //         var selected = element;
    //     }
    //     var next = $(selected).next();
    //     var prev = $(selected).prev();
    //     var prevSecond = $(prev).prev();
    //     var nextSecond = $(next).next();
    //
    //     $(selected).removeClass().addClass("selected");
    //
    //     $(prev).removeClass().addClass("prev");
    //     $(next).removeClass().addClass("next");
    //
    //     $(nextSecond).removeClass().addClass("nextRightSecond");
    //     $(prevSecond).removeClass().addClass("prevLeftSecond");
    //
    //     $(nextSecond).nextAll().removeClass().addClass('hideRight');
    //     $(prevSecond).prevAll().removeClass().addClass('hideLeft');
    // }

    showDayDetail(day: Day) {
        this.showDayDetailClick.emit(day);
    }

}
