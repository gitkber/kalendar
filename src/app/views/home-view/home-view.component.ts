import { Component, OnInit, ViewChild } from '@angular/core';
import { CoreFacade } from '../../core/core.facade';
import { RouterService } from '../../core/service/router.service';
import { AppService } from '../../app.service';
import { DayModalComponent } from '../modal/day-modal/day-modal.component';
import { Navigation } from '../../kalendar/navigation';
import { Day } from '../../kalendar/day/day';
import { Week } from '../../kalendar/week/week';
import { FileService } from '../../common/file-upload/file-service';

@Component({
    selector: 'home-view',
    templateUrl: './home-view.component.html',
    styleUrls: ['./home-view.component.css']
})
export class HomeViewComponent implements OnInit {

    @ViewChild(DayModalComponent) modal: DayModalComponent;

    public week: Week;
    private selectedDay: Day;

    errorMessage: any; // file-upload
    images: any; // file-upload

    constructor(
        private routerService: RouterService,
        private coreFacade: CoreFacade,
        private appService: AppService,
        private fileService: FileService
    ) { }

    ngOnInit(): void {
        this.week = new Week(this.appService.currentDate);
        this.selectedDay = this.week.selectDate(this.appService.currentDate);
        this.coreFacade.populateDays(this.week.days);

        this.getImageData();
    }

    navigate(event: Navigation) {
        if (event.isToday) {
            this.coreFacade.populateDays(this.week.goToday());
            this.selectedDay = this.week.selectDate(this.appService.currentDate);
        } else if (event.isNext) {
            this.coreFacade.populateDays(this.week.next());
            this.selectedDay = this.week.selectDate(this.appService.currentDate);
        } else if (event.isPrevious) {
            this.coreFacade.populateDays(this.week.previous());
            this.selectedDay = this.week.selectDate(this.appService.currentDate);
        } else if (event.isMonth) {
            this.routerService.navigateToKalMonth(event.toDate);
        } else if (event.isYear) {
            this.routerService.navigateToKalYear(event.toDate);
        } else {
            console.warn('ERROR in HomeView - Navigation');
        }
    }

    showDayDetail(event: Day) {
        this.appService.selectDate(event.date);
        this.selectedDay = this.week.selectDate(this.appService.currentDate);
        // this.routerService.navigateToDay(this.selectedDay.date);
        this.modal.open(event);
    }

    /* file-upload */
    refreshImages(status) {
        if (status === true) {
            console.log('Uploaded successfully!');
            this.getImageData();
        }
    }

    /* file-upload */
    getImageData() {
        this.fileService.getImages().subscribe(
            data => { this.images = data.result},
            error => this.errorMessage = error
        )
    }

}
