import { Component, OnInit,  trigger, state, style, transition, animate } from '@angular/core';
import { Router } from '@angular/router'
import { TokenManager} from '../service/token.manager';

@Component({
    moduleId: module.id,
    selector:'home',
    templateUrl:'./home.component.html',
    styleUrls: ['home.component.css'],
    animations: [
    trigger('flipState', [
      state('active', style({
        transform: 'rotateY(179.9deg)'
      })),
      state('inactive', style({
        transform: 'rotateY(0)'
      })),
      transition('active => inactive', animate('500ms ease-out')),
      transition('inactive => active', animate('500ms ease-in'))
    ])  
  ]
})

export class HomeComponent implements OnInit{
  

  flip: string = 'inactive';
  duration:any="0";
  min:any;
  hours:any;
  distance:any=0;
  calories:any=0;

constructor( private router: Router,private  authToken :TokenManager){

}
    ngOnInit(){
        
    }
    returnBack( ){
this.authToken.removeToken();
this.router.navigateByUrl('/login');

    }
    
  toggleFlip() {
    this.flip = (this.flip == 'inactive') ? 'active' : 'inactive';
  }
  handleData($event:any){
this.distance=$event.distance;
this.duration=$event.time;
this.calories=$event.calories;

  }
}