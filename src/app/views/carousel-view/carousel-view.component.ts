import { Component, OnInit, ViewChild } from '@angular/core';
import { CoreFacade } from '../../core/core.facade';
import { RouterService } from '../../core/service/router.service';
import { AppService } from '../../app.service';
import { Navigation } from '../../kalendar/navigation';
import { CarouselWeek } from '../../kalendar/week/carousel-week/carousel-week';
import { ImageModalComponent } from '../modal/image-modal/image-modal.component';
import { CoreModalComponent } from '../modal/core-modal/core-modal.component';
import { DayItem } from '../../kalendar/day-item';

@Component({
    selector: 'carousel-view',
    templateUrl: './carousel-view.component.html',
    styleUrls: ['./carousel-view.component.css']
})
export class CarouselViewComponent implements OnInit {

    @ViewChild(CoreModalComponent) coreModal: CoreModalComponent;
    @ViewChild(ImageModalComponent) imageModal: ImageModalComponent;

    public carouselWeek: CarouselWeek;

    quotes = [
        {
            id: 1,
            author: 'Albert Einstein',
            text: 'We can\'t solve problems by using the same kind of thinking we used when we created them.'
        },
        {
            id: 2, author: 'Antoine de Saint-Exupéry',
            text: 'Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away.'
        },
        {
            id: 3,
            author: 'Oscar Levant',
            text: 'What the world needs is more geniuses with humility, there are so few of us left.'
        },
        {
            id: 4,
            author: 'Blaise Pascal',
            text: 'I have made this letter longer than usual because I lack the time to make it shorter.'
        }
    ];

    constructor(
        private routerService: RouterService,
        private coreFacade: CoreFacade,
        private appService: AppService
    ) { }

    ngOnInit(): void {
        this.carouselWeek = new CarouselWeek(this.appService.currentDate);
        this.coreFacade.populateDays(this.carouselWeek.days);
    }

    navigate(event: Navigation) {
        if (event.isToday) {
            this.coreFacade.populateDays(this.carouselWeek.goToday());
        } else if (event.isNext) {
            this.coreFacade.populateDays(this.carouselWeek.nextWeek());
        } else if (event.isPrevious) {
            this.coreFacade.populateDays(this.carouselWeek.previousWeek());
        } else if (event.isMonth) {
            this.routerService.navigateToKalMonth(event.toDate);
        } else if (event.isYear) {
            this.routerService.navigateToKalYear(event.toDate);
        } else if (event.isDay) {
            this.coreFacade.populateDays(this.carouselWeek.goToDate(event.toDate));
        } else {
            console.warn('ERROR in CarouselView - Navigation');
        }
    }

    showDayItem(event: DayItem) {
        this.coreModal.open(event);
    }

    showImage(event: Date) {
        this.imageModal.open(event);
    }

    log(quoteId) {
        console.log('quoteId', quoteId);
    }
}
