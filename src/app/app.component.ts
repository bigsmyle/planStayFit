import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: ` 
  <router-outlet *ngIf="!istouch"></router-outlet>
             <div *ngIf="istouch">this site is not implemented for touch device yet</div>
  `,
})

export class AppComponent  { 
  public istouch:any=false;
  constructor(){
    this.istouch=this.is_touch_device();
  }


   is_touch_device() {
  return 'ontouchstart' in window        // works on most browsers 
      || navigator.maxTouchPoints
      || 'onmsgesturechange' in window;       // works on IE10/11 and Surface
};
 }
