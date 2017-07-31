import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '../common/common.module';
import { ContactService } from './contact/contact.service';
import { RouterService } from './service/router.service';
import { MemoService } from './memo/memo.service';
import { CoreService } from './core.service';
import { AuthService } from './service/auth.service';
import { DateUtilService } from './service/date-util.service';
import { ContactListComponent } from './contact/contact-list/contact-list.component';
import { ContactFormComponent } from './contact/contact-form/contact-form.component';
import { LoginFormComponent } from './user/login-form/login-form.component';
import { MemoListComponent } from './memo/memo-list/memo-list.component';
import { MemoCriteriaFormComponent } from './memo/memo-criteria-form/memo-criteria-form.component';

@NgModule({
    imports: [BrowserModule, FormsModule, ReactiveFormsModule, CommonModule],
    declarations: [ContactListComponent, ContactFormComponent, MemoListComponent, MemoCriteriaFormComponent,
        LoginFormComponent],
    exports: [ContactListComponent, ContactFormComponent, MemoListComponent, MemoCriteriaFormComponent,
        LoginFormComponent],
    providers: [ContactService, MemoService, CoreService, AuthService, RouterService, DateUtilService]
})
export class CoreModule {
}
