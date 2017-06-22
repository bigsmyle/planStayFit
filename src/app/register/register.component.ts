import { Component, OnInit, OnDestroy} from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router'
import { TokenManager} from '../service/token.manager';
import { AuthService } from '../service/auth.manager';

@Component({
  moduleId: module.id,
    selector: 'register',
    templateUrl:'./register.component.html',
    styleUrls: ['register.component.css'],
})

export class RegisterComponent implements OnInit, OnDestroy{

theForm: FormGroup;

 constructor( private router: Router, private formBuilder: FormBuilder, private authService: AuthService, private  authToken :TokenManager) {

  }

  ngOnInit(){
this.theForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(64)])],
      email: ['', Validators.compose([Validators.required, Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")])],
      username: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(64)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(32)])]
    });
  }  


  ngOnDestroy(){

  }
   onSubmit() {

this.authService.register(this.theForm.value)
      .subscribe((user:any) => {
        if(user.email){
       this.authToken.setToken(user);
       this.router.navigateByUrl('/home');
        } 
          },
      (error:any) => { console.error(error) }
      )
     
   }
}