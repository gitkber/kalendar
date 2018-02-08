import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Action } from '../../action';
import { Event, EventAction } from '../event';
import { isUndefined } from 'util';
import { EventService } from '../event.service';

@Component({
    selector: 'event-detail',
    templateUrl: './event-detail.component.html',
    styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnChanges {

    @Input() event: Event;
    @Output() closeClick = new EventEmitter();

    public formGroup: FormGroup;
    public eventKey: string;
    public toKalendarDate: Date;

    private datesToAdd: Date[] = [];

    constructor(private eventService: EventService) {
        this.formGroup = new FormGroup({
            description: new FormControl('', Validators.required),
            duplication: new FormControl('', Validators.pattern('[0-9]')),
            includeWeekend: new FormControl()
        })
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.event.currentValue !== undefined) {
            this.eventKey = changes.event.currentValue['$key'];

            this.changeSwitchToKalendarDate();
            this.formGroup.setValue({
                'description': changes.event.currentValue['$value'] !== null ? this.event.description : '',
                'duplication': '',
                'includeWeekend': false
            });
        }
    }

    changeSwitchToKalendarDate() {
        this.changeToKalendarDate(parseInt(this.formGroup.get('duplication').value, 10),
            !this.formGroup.get('includeWeekend').value);
    }

    changeDuplicationToKalendarDate(event) {
        event.target.value = event.target.value.replace(/[^0-9]/g, '');
        this.changeToKalendarDate(parseInt(event.target.value, 10), this.formGroup.get('includeWeekend').value);
    }

    saveEvent() {
        if (!this.formGroup.valid) {
            this.formGroup.get('description').markAsTouched();
        } else {
            this.event.description = this.formGroup.get('description').value;
            let eventAction: EventAction;
            if (this.isEmptyKey()) {
                eventAction = new EventAction(Action.INSERT, this.event);
            } else {
                eventAction = new EventAction(Action.UPDATE, this.event);
                eventAction.eventKey = this.eventKey;
            }
            eventAction.datesToAdd = this.datesToAdd;
            this.actionClickEmitAndResetFormGroup(eventAction);
        }
    }

    deleteEvent() {
        if (!this.isEmptyKey()) {
            const eventAction: EventAction = new EventAction(Action.DELETE);
            eventAction.eventKey = this.eventKey;
            this.actionClickEmitAndResetFormGroup(eventAction);
        }
    }

    close() {
        this.closeClick.emit();
        this.formGroup.reset();
    }

    private changeToKalendarDate(duplication: number, includeWeekend: boolean) {
        const startDate: Date = new Date(this.event.kalendarDate);
        this.datesToAdd = [];
        this.datesToAdd.push(new Date(startDate));
        for (let i = 1; i <= duplication; i++) {
            startDate.setDate(startDate.getDate() + 1);
            if (!includeWeekend) {
                if (startDate.getDay() === 6) {
                    startDate.setDate(startDate.getDate() + 2);
                } else if (startDate.getDay() === 0) {
                    startDate.setDate(startDate.getDate() + 1);
                }
            }
            this.datesToAdd.push(new Date(startDate));
        }
        this.toKalendarDate = startDate;
    }

    private actionClickEmitAndResetFormGroup(eventAction: EventAction) {
        this.eventService.doActionOnEvent(eventAction);
        this.close();
    }

    private isEmptyKey(): boolean {
        return isUndefined(this.eventKey) || this.eventKey === null;
    }
}
