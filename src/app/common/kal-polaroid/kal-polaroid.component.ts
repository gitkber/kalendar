import { Component, Input } from '@angular/core';

@Component({
  selector: 'kal-polaroid',
  templateUrl: './kal-polaroid.component.html',
  styleUrls: ['./kal-polaroid.component.css']
})
export class KalPolaroidComponent {

    @Input() label: string;
    @Input() image: string;

}
