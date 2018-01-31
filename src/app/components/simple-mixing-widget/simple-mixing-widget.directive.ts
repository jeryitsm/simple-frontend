import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appSimpleMixingWidget]'
})
export class SimpleMixingWidgetDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
