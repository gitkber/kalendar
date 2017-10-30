import { Component, OnInit, ViewChild } from '@angular/core';
import { CoreFacade } from '../../core/core.facade';
import { RouterService } from '../../core/service/router.service';
import { AppService } from '../../app.service';
import { ImageModalComponent } from '../modal/image-modal/image-modal.component';
import { Navigation } from '../../kalendar/navigation';
import { CarouselDays } from '../../kalendar/carousel-days/carousel-days';
import { CoreModalComponent } from '../modal/core-modal/core-modal.component';
import { DayItem } from '../../kalendar/day-item';

@Component({
    selector: 'home-view',
    templateUrl: './home-view.component.html',
    styleUrls: ['./home-view.component.css']
})
export class HomeViewComponent implements OnInit {

    @ViewChild(CoreModalComponent) coreModal: CoreModalComponent;
    @ViewChild(ImageModalComponent) imageModal: ImageModalComponent;

    public carouselDays: CarouselDays;

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
        this.carouselDays = new CarouselDays(this.appService.currentDate);
        this.coreFacade.populateDays(this.carouselDays.days);
    }

    navigate(event: Navigation) {
        if (event.isToday) {
            this.coreFacade.populateDays(this.carouselDays.goToday());
        } else if (event.isNext) {
            this.coreFacade.populateDays(this.carouselDays.nextWeek());
        } else if (event.isPrevious) {
            this.coreFacade.populateDays(this.carouselDays.previousWeek());
        } else if (event.isMonth) {
            this.routerService.navigateToKalMonth(event.toDate);
        } else if (event.isYear) {
            this.routerService.navigateToKalYear(event.toDate);
        } else if (event.isDay) {
            this.coreFacade.populateDays(this.carouselDays.goToDate(event.toDate));
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
