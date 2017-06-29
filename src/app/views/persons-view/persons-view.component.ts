import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'persons-view',
  templateUrl: './persons-view.component.html',
  styleUrls: ['./persons-view.component.css']
})
export class PersonsViewComponent implements OnInit {

  title = 'Kalendar';
  items: FirebaseListObservable<any[]>;

  constructor(public af: AngularFireDatabase) {
    this.items = af.list('/messages', {
      query: {
        limitToLast: 50
      }
    });
  }

  ngOnInit() {
  }

}
