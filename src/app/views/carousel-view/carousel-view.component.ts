import { Component, OnInit, ViewChild } from '@angular/core';
import { CoreFacade } from '../../core/core.facade';
import { RouterService } from '../../core/service/router.service';
import { AppService } from '../../app.service';
import { DayModalComponent } from '../modal/day-modal/day-modal.component';
import { Navigation } from '../../kalendar/navigation';
import { CarouselWeek } from '../../kalendar/week/carousel-week/carousel-week';
import { ImageModalComponent } from '../modal/image-modal/image-modal.component';

@Component({
    selector: 'carousel-view',
    templateUrl: './carousel-view.component.html',
    styleUrls: ['./carousel-view.component.css']
})
export class CarouselViewComponent implements OnInit {

    @ViewChild(DayModalComponent) dayModal: DayModalComponent;
    @ViewChild(ImageModalComponent) imageModal: ImageModalComponent;

    public carouselWeek: CarouselWeek;

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

    showDayDetail(event) {
        this.appService.selectDate(event.date);
        this.dayModal.open(event);
    }

    showImage(event: Date) {
        this.imageModal.open(event);
    }

}
