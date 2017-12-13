import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '../common/common.module';
import { ContactService } from './contact/contact.service';
import { ContactHolidayService } from './holiday/contact-holiday/contact-holiday.service';
import { PublicHolidayService } from './holiday/public-holiday/public-holiday.service';
import { MemoService } from './memo/memo.service';
import { ImageService } from './image/image.service';
import { TimelineService } from './timeline/timeline.service';
import { CatchAllService } from './catch-all/catch-all.service';
import { RouterService } from './service/router.service';
import { AuthService } from './service/auth.service';
import { ContactListComponent } from './contact/contact-list/contact-list.component';
import { ContactFormComponent } from './contact/contact-form/contact-form.component';
import { BirthdayPostItComponent } from './contact/birthday-post-it/birthday-post-it.component';
import { CatchAllFormComponent } from './catch-all/catch-all-form/catch-all-form.component';
import { CatchAllListComponent } from './catch-all/catch-all-list/catch-all-list.component';
import { CatchAllPostItComponent } from './catch-all/catch-all-post-it/catch-all-post-it.component';
import { CarouselBudgetComponent } from './catch-all/carousel-budget/carousel-budget.component';
import { MonthInCarouselBudgetComponent } from './catch-all/carousel-budget/month-in-carousel-budget/month-in-carousel-budget.component';
import { LoginFormComponent } from './user/login-form/login-form.component';
import { MemoFormComponent } from './memo/memo-form/memo-form.component';
import { PublicHolidayFormComponent } from './holiday/public-holiday/public-holiday-form/public-holiday-form.component';
import { ContactHolidayFormComponent } from './holiday/contact-holiday/contact-holiday-form/contact-holiday-form.component';
import { WeekImageComponent } from './image/week-image/week-image.component';
import { TimelineListComponent } from './timeline/timeline-list/timeline-list.component';
import { OneTimelineComponent } from './timeline/one-timeline/one-timeline.component';

@NgModule({
    imports: [BrowserModule, FormsModule, ReactiveFormsModule, CommonModule],
    declarations: [LoginFormComponent,
        ContactFormComponent, ContactListComponent, BirthdayPostItComponent,
        CatchAllFormComponent, CatchAllListComponent, CatchAllPostItComponent, CarouselBudgetComponent, MonthInCarouselBudgetComponent,
        TimelineListComponent, OneTimelineComponent,
        MemoFormComponent,
        PublicHolidayFormComponent,
        ContactHolidayFormComponent,
        WeekImageComponent],
    exports: [LoginFormComponent,
        ContactFormComponent, ContactListComponent, BirthdayPostItComponent, CarouselBudgetComponent,
        CatchAllFormComponent, CatchAllListComponent, CatchAllPostItComponent,
        TimelineListComponent, OneTimelineComponent,
        MemoFormComponent,
        PublicHolidayFormComponent,
        ContactHolidayFormComponent,
        WeekImageComponent],
    providers: [ContactService, MemoService, PublicHolidayService, ContactHolidayService, ImageService, CatchAllService, TimelineService,
        AuthService, RouterService]
})
export class CoreModule {
}
