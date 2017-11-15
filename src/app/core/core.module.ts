import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '../common/common.module';
import { ContactService } from './contact/contact.service';
import { ContactHolidayService } from './holiday/contact-holiday/contact-holiday.service';
import { PublicHolidayService } from './holiday/public-holiday/public-holiday.service';
import { MemoService } from './memo/memo.service';
import { ImageService } from './image/image.service';
import { CatchAllService } from './catch-all/catch-all.service';
import { RouterService } from './service/router.service';
import { AuthService } from './service/auth.service';
import { ContactListComponent } from './contact/contact-list/contact-list.component';
import { ContactFormComponent } from './contact/contact-form/contact-form.component';
import { CatchAllFormComponent } from './catch-all/catch-all-form/catch-all-form.component';
import { CatchAllListComponent } from './catch-all/catch-all-list/catch-all-list.component';
import { LoginFormComponent } from './user/login-form/login-form.component';
import { MemoFormComponent } from './memo/memo-form/memo-form.component';
import { PublicHolidayFormComponent } from './holiday/public-holiday/public-holiday-form/public-holiday-form.component';
import { ContactHolidayFormComponent } from './holiday/contact-holiday/contact-holiday-form/contact-holiday-form.component';
import { WeekImageComponent } from './image/week-image/week-image.component';

@NgModule({
    imports: [BrowserModule, FormsModule, ReactiveFormsModule, CommonModule],
    declarations: [LoginFormComponent,
        ContactFormComponent, ContactListComponent,
        CatchAllFormComponent, CatchAllListComponent,
        MemoFormComponent,
        PublicHolidayFormComponent,
        ContactHolidayFormComponent,
        WeekImageComponent],
    exports: [LoginFormComponent,
        ContactFormComponent, ContactListComponent,
        CatchAllFormComponent, CatchAllListComponent,
        MemoFormComponent,
        PublicHolidayFormComponent,
        ContactHolidayFormComponent,
        WeekImageComponent],
    providers: [ContactService, MemoService, PublicHolidayService, ContactHolidayService, ImageService, CatchAllService,
        AuthService, RouterService]
})
export class CoreModule {
}
