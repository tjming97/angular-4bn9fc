import { Component, HostListener, ComponentRef, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { SkillTooltipComponent } from './skill-tooltip/skill-tooltip.component';
import { PopupHostDirective } from './directives/host.directive';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  skillInf = 'Some additional information'
  currentSkillElement: any;
  private calloutRef: ComponentRef<SkillTooltipComponent>;
  @ViewChild(PopupHostDirective)
    private popupHost: PopupHostDirective;
  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  // popup methods 
  /**
  * DYNAMIC POPUP METHODS
  */
  onSkillMouseEnter(event, skill) {
    this.currentSkillElement = event.target;
    const currentPosition = this.offset(event.target);
    this.showCallout(skill, currentPosition);

  }
  @HostListener('mouseover', ['$event'])
  onSkillMouseOver(event) {
    let hoverComponent = event.target;
    let inside = false;
    do {
      if (this.calloutRef) {
        if (hoverComponent === this.calloutRef.location.nativeElement || hoverComponent === this.currentSkillElement) {
          inside = true;
        }
      }
      hoverComponent = hoverComponent.parentNode;
    } while (hoverComponent);
    if (inside) {
      console.log('inside');
    } else {
      console.log('outside');
      this.hideCallout();
    }
  }
  private createCallout(data: any): ComponentRef<SkillTooltipComponent> {
    const viewContainer = this.popupHost.viewContainerRef;
    viewContainer.clear();
    const calloutComponentFactory =
      this.componentFactoryResolver.resolveComponentFactory(SkillTooltipComponent);
    const calloutComponentRef = viewContainer.createComponent(calloutComponentFactory);
    calloutComponentRef.instance.data = data;
    return calloutComponentRef;
  }
  showCallout(skill, currentPosition) {
    this.calloutRef = this.createCallout(skill);
    this.calloutRef.instance.styleLeft = currentPosition.left + 'px';
    this.calloutRef.instance.styleTop = currentPosition.top + 27 + 'px';
  }
  hideCallout() {
    if (this.calloutRef) {
      this.calloutRef.destroy();
      this.calloutRef = null;
    }
  }
  // calculate position relative to document for proper popup displaying
  private offset(el) {
    const rect = el.getBoundingClientRect();
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
  }
}