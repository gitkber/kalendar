import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactListComponent } from './contact/contact-list/contact-list.component';
import { ContactFormComponent } from './contact/contact-form/contact-form.component';
import { ContactService, MockContactService } from './contact/contact.service';
import { LineListComponent } from './line/line-list/line-list.component';
import { LineFormComponent } from './line/line-form/line-form.component';
import { LineService, MockLineService } from './line/line.service';

@NgModule({
    imports: [BrowserModule, FormsModule, ReactiveFormsModule],
    declarations: [ContactListComponent, ContactFormComponent, LineListComponent, LineFormComponent],
    exports: [ContactListComponent, ContactFormComponent, LineListComponent, LineFormComponent],
    providers: [{provide: ContactService, useClass: MockContactService}, {provide: LineService, useClass: MockLineService}]
})
export class CoreModule { }
