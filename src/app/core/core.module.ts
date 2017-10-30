import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '../common/common.module';
import { ContactService } from './contact/contact.service';
import { ContactHolidayService } from './holiday/contact-holiday/contact-holiday.service';
import { PublicHolidayService } from './holiday/public-holiday/public-holiday.service';
import { MemoService } from './memo/memo.service';
import { RouterService } from './service/router.service';
import { AuthService } from './service/auth.service';
import { ImageService } from './image/image.service';
import { ContactListComponent } from './contact/contact-list/contact-list.component';
import { ContactFormComponent } from './contact/contact-form/contact-form.component';
import { LoginFormComponent } from './user/login-form/login-form.component';
import { MemoListComponent } from './memo/memo-list/memo-list.component';
import { MemoFormComponent } from './memo/memo-form/memo-form.component';
import { PublicHolidayFormComponent } from './holiday/public-holiday/public-holiday-form/public-holiday-form.component';
import { PublicHolidayListComponent } from './holiday/public-holiday/public-holiday-list/public-holiday-list.component';
import { ContactHolidayFormComponent } from './holiday/contact-holiday/contact-holiday-form/contact-holiday-form.component';
import { ContactHolidayListComponent } from './holiday/contact-holiday/contact-holiday-list/contact-holiday-list.component';
import { WeekImageComponent } from './image/week-image/week-image.component';

@NgModule({
    imports: [BrowserModule, FormsModule, ReactiveFormsModule, CommonModule],
    declarations: [LoginFormComponent,
        ContactFormComponent, ContactListComponent,
        MemoFormComponent, MemoListComponent,
        PublicHolidayFormComponent, PublicHolidayListComponent,
        ContactHolidayFormComponent, ContactHolidayListComponent,
        WeekImageComponent],
    exports: [LoginFormComponent,
        ContactFormComponent, ContactListComponent,
        MemoFormComponent,
        PublicHolidayFormComponent,
        ContactHolidayFormComponent,
        WeekImageComponent],
    providers: [ContactService, MemoService, PublicHolidayService, ContactHolidayService, ImageService,
        AuthService, RouterService]
})
export class CoreModule {
}
