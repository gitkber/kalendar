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
import { ContactListComponent } from './contact/contact-list/contact-list.component';
import { ContactFormComponent } from './contact/contact-form/contact-form.component';
import { BirthdayPostItComponent } from './contact/birthday-post-it/birthday-post-it.component';
import { CarouselBudgetComponent } from './budget/carousel-budget/carousel-budget.component';
import { MonthInCarouselBudgetComponent } from './budget/carousel-budget/month-in-carousel-budget/month-in-carousel-budget.component';
import { LoginFormComponent } from './user/login-form/login-form.component';
import { EventFormComponent } from './event/event-form/event-form.component';
import { PublicHolidayFormComponent } from './holiday/public-holiday/public-holiday-form/public-holiday-form.component';
import { ContactHolidayFormComponent } from './holiday/contact-holiday/contact-holiday-form/contact-holiday-form.component';
import { WeekImageComponent } from './image/week-image/week-image.component';
import { ObjectiveListComponent } from './objective/objective-list/objective-list.component';
import { ObjectiveFormComponent } from './objective/objective-form/objective-form.component';

@NgModule({
    imports: [BrowserModule, FormsModule, ReactiveFormsModule, CommonModule],
    declarations: [LoginFormComponent,
        ContactFormComponent, ContactListComponent, BirthdayPostItComponent,
        CarouselBudgetComponent, MonthInCarouselBudgetComponent,
        ObjectiveListComponent, ObjectiveFormComponent,
        EventFormComponent,
        PublicHolidayFormComponent,
        ContactHolidayFormComponent,
        WeekImageComponent],
    exports: [LoginFormComponent,
        ContactFormComponent, ContactListComponent, BirthdayPostItComponent,
        CarouselBudgetComponent,
        ObjectiveListComponent, ObjectiveFormComponent,
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
