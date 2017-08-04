import { Directive, ElementRef, Attribute, OnInit } from '@angular/core';

@Directive({
  selector: '[logoColor]'
})
export class LogoColorDirective implements OnInit {

  constructor(public el:ElementRef) { }

  ngOnInit() {
    this.el.nativeElement.querySelector('#logoContainer').style.borderBottom = '1px solid rgba(253, 95, 0, 0.8)';
    this.el.nativeElement.querySelector('#logoTitle').style.color = 'rgba(253, 95, 0, 0.8)';
    this.el.nativeElement.querySelector('#logoDescription').style.color = 'rgba(253, 95, 0, 0.8)';
  }

}
