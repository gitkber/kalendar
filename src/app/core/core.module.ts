import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '../common/common.module';
import { ContactService } from './contact/contact.service';
import { ContactHolidayService } from './holiday/contact-holiday/contact-holiday.service';
import { PublicHolidayService } from './holiday/public-holiday/public-holiday.service';
import { MemoService } from './memo/memo.service';
import { CoreFacade } from './core.facade';
import { RouterService } from './service/router.service';
import { AuthService } from './service/auth.service';
import { DateUtilService } from './service/date-util.service';
import { ContactListComponent } from './contact/contact-list/contact-list.component';
import { ContactFormComponent } from './contact/contact-form/contact-form.component';
import { LoginFormComponent } from './user/login-form/login-form.component';
import { MemoListComponent } from './memo/memo-list/memo-list.component';
import { MemoCriteriaFormComponent } from './memo/memo-criteria-form/memo-criteria-form.component';
import { PublicHolidayFormComponent } from './holiday/public-holiday/public-holiday-form/public-holiday-form.component';
import { PublicHolidayListComponent } from './holiday/public-holiday/public-holiday-list/public-holiday-list.component';
import { ContactHolidayFormComponent } from './holiday/contact-holiday/contact-holiday-form/contact-holiday-form.component';
import { ContactHolidayListComponent } from './holiday/contact-holiday/contact-holiday-list/contact-holiday-list.component';

@NgModule({
    imports: [BrowserModule, FormsModule, ReactiveFormsModule, CommonModule],
    declarations: [LoginFormComponent,
        ContactFormComponent, ContactListComponent,
        MemoCriteriaFormComponent, MemoListComponent,
        PublicHolidayFormComponent, PublicHolidayListComponent,
        ContactHolidayFormComponent, ContactHolidayListComponent],
    exports: [LoginFormComponent,
        ContactFormComponent, ContactListComponent,
        MemoCriteriaFormComponent, MemoListComponent,
        PublicHolidayFormComponent, PublicHolidayListComponent,
        ContactHolidayFormComponent, ContactHolidayListComponent],
    providers: [ContactService, MemoService, PublicHolidayService, ContactHolidayService, CoreFacade, AuthService, RouterService, DateUtilService]
})
export class CoreModule {
}
