import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { LineCriteria } from '../line-criteria';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Action } from '../../action';
import { DateStringPipe } from '../../../common/pipe/date-string.pipe';

@Component({
  selector: 'line-criteria-form',
  templateUrl: './line-criteria-form.component.html',
  styleUrls: ['./line-criteria-form.component.css']
})
export class LineCriteriaFormComponent implements OnInit {

  @Input() lineCriteria: LineCriteria;
  @Output() actionClick = new EventEmitter<LineCriteria>();

  private dateStringPipe: DateStringPipe = new DateStringPipe();
  public lineCriteriaFormGroup: FormGroup;

  constructor() { }

  ngOnInit() {
    this.lineCriteriaFormGroup = new FormGroup({
      description: new FormControl('', Validators.required),
      kalendarDate: new FormControl('', Validators.required)
    });
    this.lineCriteriaFormGroup.valueChanges.subscribe(data => {
      this.lineCriteria = data
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.lineCriteria.currentValue !== undefined) {
      this.lineCriteria = changes.line.currentValue;
      this.lineCriteriaFormGroup.setValue({
        'description': this.lineCriteria.description,
        'kalendarDate': this.dateStringPipe.transform(this.lineCriteria.kalendarDate)
      });
    }
  }

  saveLine() {
    this.lineCriteria.kalendarDate = this.dateStringPipe.transform(this.lineCriteria.kalendarDate, true);

    if (this.lineCriteria.lineKey === undefined) {
      this.lineCriteria.action = Action.INSERT;
    } else {
      this.lineCriteria.action = Action.UPDATE;
    }
    this.actionClick.emit(this.lineCriteria);
    this.lineCriteria = undefined;
    this.lineCriteriaFormGroup.reset();
  }

  deleteLine() {
    if (this.lineCriteria.lineKey !== undefined) {
      this.lineCriteria.action = Action.DELETE;
      this.actionClick.emit(this.lineCriteria);
      this.lineCriteria = undefined;
      this.lineCriteriaFormGroup.reset();
    }
  }

}
