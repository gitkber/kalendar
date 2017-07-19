import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '../common/common.module';
import { ContactService } from './contact/contact.service';
import { RouterService } from './service/router.service';
import { LineService } from './line/line.service';
import { CoreService } from './core.service';
import { AuthService } from './service/auth.service';
import { ContactListComponent } from './contact/contact-list/contact-list.component';
import { ContactFormComponent } from './contact/contact-form/contact-form.component';
import { LoginFormComponent } from './user/login-form/login-form.component';
import { LineListComponent } from './line/line-list/line-list.component';
import { LineFormComponent } from './line/line-form/line-form.component';

@NgModule({
    imports: [BrowserModule, FormsModule, ReactiveFormsModule, CommonModule],
    declarations: [ContactListComponent, ContactFormComponent, LineListComponent, LineFormComponent,
        LoginFormComponent],
    exports: [ContactListComponent, ContactFormComponent, LineListComponent, LineFormComponent,
        LoginFormComponent],
    providers: [ContactService, LineService, CoreService, AuthService, RouterService]
})
export class CoreModule {
}
