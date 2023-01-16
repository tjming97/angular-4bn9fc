import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[popup-host]',
})
export class PopupHostDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
