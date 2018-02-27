import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '../common/common.module';
import { ContactService } from './contact/contact.service';
import { HolidayService } from './holiday/holiday.service';
import { EventService } from './event/event.service';
import { ImageService } from './image/image.service';
import { ObjectiveService } from './objective/objective.service';
import { TimelineService } from './objective/timeline.service';
import { BudgetService } from './budget/budget.service';
import { RouterService } from './service/router.service';
import { AuthService } from './service/auth.service';
import { CarouselDaysComponent } from './carousel-days/carousel-days.component';
import { DayInCarouselDaysComponent } from './carousel-days/day-in-carousel-days/day-in-carousel-days.component';
import { EditDayComponent } from './carousel-days/edit-day/edit-day.component';
import { ContactListComponent } from './contact/contact-list/contact-list.component';
import { ContactDetailComponent } from './contact/contact-detail/contact-detail.component';
import { BirthdayPostItComponent } from './contact/birthday-post-it/birthday-post-it.component';
import { ToBuyListComponent } from './budget/to-buy-list/to-buy-list.component';
import { BudgetDetailComponent } from './budget/budget-detail/budget-detail.component';
import { CarouselBudgetComponent } from './budget/carousel-budget/carousel-budget.component';
import { MonthInCarouselBudgetComponent } from './budget/carousel-budget/month-in-carousel-budget/month-in-carousel-budget.component';
import { LoginFormComponent } from './user/login-form/login-form.component';
import { EventDetailComponent } from './event/event-detail/event-detail.component';
import { WeekImageComponent } from './image/week-image/week-image.component';
import { ObjectiveListComponent } from './objective/objective-list/objective-list.component';
import { ObjectiveListRowComponent } from './objective/objective-list/objective-list-row/objective-list-row.component';
import { ObjectiveDetailComponent } from './objective/objective-detail/objective-detail.component';
import { ObjectiveItemDetailComponent } from './objective/objective-item-detail/objective-item-detail.component';
import { TimelineComponent } from './objective/timeline/timeline.component';
import { ContactListRowComponent } from './contact/contact-list/contact-list-row/contact-list-row.component';
import { HolidayDetailComponent } from './holiday/holiday-detail/holiday-detail.component';

@NgModule({
    imports: [BrowserModule, FormsModule, ReactiveFormsModule, CommonModule],
    declarations: [LoginFormComponent,
        ContactListComponent, ContactListRowComponent, BirthdayPostItComponent, ContactDetailComponent,
        CarouselBudgetComponent, MonthInCarouselBudgetComponent,
        CarouselDaysComponent, DayInCarouselDaysComponent, EditDayComponent,
        ObjectiveListComponent, ObjectiveListRowComponent, ObjectiveDetailComponent, ObjectiveItemDetailComponent,
        TimelineComponent,
        ToBuyListComponent, BudgetDetailComponent,
        EventDetailComponent,
        HolidayDetailComponent,
        WeekImageComponent],
    exports: [LoginFormComponent,
        ContactListComponent, BirthdayPostItComponent,
        CarouselBudgetComponent, CarouselDaysComponent,
        ObjectiveListComponent,
        ToBuyListComponent,
        WeekImageComponent],
    providers: [ContactService, EventService, HolidayService, ImageService,
        ObjectiveService, BudgetService, TimelineService,
        AuthService, RouterService]
})
export class CoreModule {
}
