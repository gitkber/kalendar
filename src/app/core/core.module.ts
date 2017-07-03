import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ContactListComponent } from './contact/contact-list/contact-list.component';
import { ContactService, MockContactService } from "./contact/contact.service";

@NgModule({
    imports: [BrowserModule],
    declarations: [ContactListComponent],
    exports: [ContactListComponent],
    providers: [{ provide: ContactService, useClass: MockContactService } ]
})
export class CoreModule { }