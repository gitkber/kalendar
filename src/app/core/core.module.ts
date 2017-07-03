import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactListComponent } from './contact/contact-list/contact-list.component';
import { ContactFormComponent } from './contact/contact-form/contact-form.component';
import { ContactService, MockContactService } from "./contact/contact.service";

@NgModule({
    imports: [BrowserModule, FormsModule, ReactiveFormsModule],
    declarations: [ContactListComponent, ContactFormComponent],
    exports: [ContactListComponent, ContactFormComponent],
    providers: [{ provide: ContactService, useClass: MockContactService } ]
})
export class CoreModule { }