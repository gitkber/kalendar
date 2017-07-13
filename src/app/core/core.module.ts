import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactListComponent } from './contact/contact-list/contact-list.component';
import { ContactFormComponent } from './contact/contact-form/contact-form.component';
import { ContactService } from './contact/contact.service';
import { LineListComponent } from './line/line-list/line-list.component';
import { LineFormComponent } from './line/line-form/line-form.component';
import { LineService } from './line/line.service';
import { CoreService } from './core.service';
import { LoginFormComponent } from './user/login-form/login-form.component';

@NgModule({
    imports: [BrowserModule, FormsModule, ReactiveFormsModule],
    declarations: [ContactListComponent, ContactFormComponent, LineListComponent, LineFormComponent,
        LoginFormComponent],
    exports: [ContactListComponent, ContactFormComponent, LineListComponent, LineFormComponent,
        LoginFormComponent],
    providers: [ContactService, LineService, CoreService]
})
export class CoreModule {
}
