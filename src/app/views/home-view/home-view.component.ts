import { Component, OnInit } from '@angular/core';
import { User } from '../../core/user/user';

@Component({
    selector: 'home-view',
    templateUrl: './home-view.component.html',
    styleUrls: ['./home-view.component.css']
})
export class HomeViewComponent implements OnInit {

    public user: User;

    constructor() { }

    ngOnInit() { }

    setDemoLogin() {
        this.user = new User(null, 'toto.test@gmail.com', 'bonjour');
        // this.user = new User(null, 'kslyfe.demo@gmail.com', 'matouchka*');
    }
}
