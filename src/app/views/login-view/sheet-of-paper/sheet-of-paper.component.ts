import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'sheet-of-paper',
  templateUrl: './sheet-of-paper.component.html',
  styleUrls: ['./sheet-of-paper.component.css']
})
export class SheetOfPaperComponent {

  @Output() setDemoLoginClick = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  setDemoLogin() {
    this.setDemoLoginClick.emit();
  }

}
