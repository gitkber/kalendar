import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '../common/common.module';
import { ContactService } from './contact/contact.service';
import { ContactHolidayService } from './holiday/contact-holiday/contact-holiday.service';
import { PublicHolidayService } from './holiday/public-holiday/public-holiday.service';
import { EventService } from './event/event.service';
import { ImageService } from './image/image.service';
import { ObjectiveService } from './objective/objective.service';
import { BudgetService } from './budget/budget.service';
import { RouterService } from './service/router.service';
import { AuthService } from './service/auth.service';
import { CarouselDaysComponent } from './carousel-days/carousel-days.component';
import { DayInCarouselDaysComponent } from './carousel-days/day-in-carousel-days/day-in-carousel-days.component';
import { EditDayComponent } from './carousel-days/edit-day/edit-day.component';
import { ContactListComponent } from './contact/contact-list/contact-list.component';
import { ContactFormComponent } from './contact/contact-form/contact-form.component';
import { ContactDetailComponent } from './contact/contact-detail/contact-detail.component';
import { BirthdayPostItComponent } from './contact/birthday-post-it/birthday-post-it.component';
import { BudgetFormComponent } from './budget/budget-form/budget-form.component';
import { ToBuyListComponent } from './budget/to-buy-list/to-buy-list.component';
import { BudgetDetailComponent } from './budget/budget-detail/budget-detail.component';
import { CarouselBudgetComponent } from './budget/carousel-budget/carousel-budget.component';
import { MonthInCarouselBudgetComponent } from './budget/carousel-budget/month-in-carousel-budget/month-in-carousel-budget.component';
import { LoginFormComponent } from './user/login-form/login-form.component';
import { EventFormComponent } from './event/event-form/event-form.component';
import { EventDetailComponent } from './event/event-detail/event-detail.component';
import { PublicHolidayFormComponent } from './holiday/public-holiday/public-holiday-form/public-holiday-form.component';
import { PublicHolidayDetailComponent } from './holiday/public-holiday/public-holiday-detail/public-holiday-detail.component';
import { ContactHolidayFormComponent } from './holiday/contact-holiday/contact-holiday-form/contact-holiday-form.component';
import { ContactHolidayDetailComponent } from './holiday/contact-holiday/contact-holiday-detail/contact-holiday-detail.component';
import { WeekImageComponent } from './image/week-image/week-image.component';
import { ObjectiveListComponent } from './objective/objective-list/objective-list.component';
import { ObjectiveFormComponent } from './objective/objective-form/objective-form.component';

@NgModule({
    imports: [BrowserModule, FormsModule, ReactiveFormsModule, CommonModule],
    declarations: [LoginFormComponent,
        ContactFormComponent, ContactListComponent, BirthdayPostItComponent, ContactDetailComponent,
        CarouselBudgetComponent, MonthInCarouselBudgetComponent,
        CarouselDaysComponent, DayInCarouselDaysComponent, EditDayComponent,
        ObjectiveListComponent, ObjectiveFormComponent,
        BudgetFormComponent, ToBuyListComponent, BudgetDetailComponent,
        EventFormComponent, EventDetailComponent,
        PublicHolidayFormComponent, PublicHolidayDetailComponent,
        ContactHolidayFormComponent, ContactHolidayDetailComponent,
        WeekImageComponent],
    exports: [LoginFormComponent,
        ContactFormComponent, ContactListComponent, BirthdayPostItComponent,
        CarouselBudgetComponent, CarouselDaysComponent,
        ObjectiveListComponent, ObjectiveFormComponent,
        BudgetFormComponent, ToBuyListComponent,
        EventFormComponent,
        PublicHolidayFormComponent,
        ContactHolidayFormComponent,
        WeekImageComponent],
    providers: [ContactService, EventService, PublicHolidayService, ContactHolidayService, ImageService,
        ObjectiveService, BudgetService,
        AuthService, RouterService]
})
export class CoreModule {
}
