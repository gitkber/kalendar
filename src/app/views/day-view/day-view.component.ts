import { Component, OnInit, ViewChild } from '@angular/core';
import { ViewsFacade } from '../views.facade';
import { RouterService } from '../../core/service/router.service';
import { AppService } from '../../app.service';
import { ImageModalComponent } from '../modal/image-modal/image-modal.component';
import { Navigation } from '../../kalendar/navigation';
import { CarouselDays } from '../../core/carousel-days/carousel-days';
import { Observable } from 'rxjs/Observable';
import { Budget } from '../../core/budget/budget';

@Component({
    selector: 'day-view',
    templateUrl: './day-view.component.html',
    styleUrls: ['./day-view.component.css']
})
export class DayViewComponent implements OnInit {

    @ViewChild(ImageModalComponent) imageModal: ImageModalComponent;

    public carouselDays: CarouselDays;
    public budgetToBuy: Observable<Budget[]>;

    constructor(
        public routerService: RouterService,
        private viewsFacade: ViewsFacade,
        private appService: AppService
    ) { }

    ngOnInit(): void {
        this.carouselDays = new CarouselDays(this.appService.currentDate);
        this.viewsFacade.populateDays(this.carouselDays.days);

        this.budgetToBuy = this.viewsFacade.budgetService.findAllTagOperationToBuy();
    }

    navigate(event: Navigation) {
        if (event.isToday) {
            this.viewsFacade.populateDays(this.carouselDays.goToday());
        } else if (event.isNext) {
            this.viewsFacade.populateDays(this.carouselDays.nextWeek());
        } else if (event.isPrevious) {
            this.viewsFacade.populateDays(this.carouselDays.previousWeek());
        } else if (event.isMonth) {
            this.routerService.navigateToKalMonth(event.toDate);
        } else if (event.isYear) {
            this.routerService.navigateToKalYear(event.toDate);
        } else if (event.isDay) {
            this.viewsFacade.populateDays(this.carouselDays.goToDate(event.toDate));
        } else {
            console.warn('ERROR in CarouselView - Navigation');
        }
    }

    showImage(event: Date) {
        this.imageModal.open(event);
    }

    log(id) {
        console.log('id', id);
    }

}
