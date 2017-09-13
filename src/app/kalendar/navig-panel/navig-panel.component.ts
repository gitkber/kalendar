import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Navigation } from '../navigation';

@Component({
    selector: 'navig-panel',
    templateUrl: './navig-panel.component.html',
    styleUrls: ['./navig-panel.component.css']
})
export class NavigPanelComponent {

    @Input() navigation: string; // year - month - day
    @Output() navigateClick: EventEmitter<Navigation> = new EventEmitter();

    goToday() {
        const navigation: Navigation = new Navigation(this.navigation);
        navigation.isToday = true;
        this.navigateClick.emit(navigation);
    }

    goNext() {
        const navigation: Navigation = new Navigation(this.navigation);
        navigation.isNext = true;
        this.navigateClick.emit(navigation);
    }

    goPrevious() {
        const navigation: Navigation = new Navigation(this.navigation);
        navigation.isPrevious = true;
        this.navigateClick.emit(navigation);
    }

}
