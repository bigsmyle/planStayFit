import { Component, OnInit, OnDestroy} from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router'
import { TokenManager} from '../service/token.manager';
import { AuthService } from '../service/auth.manager';


@Component({
  moduleId: module.id,
    selector: 'login',
    templateUrl:'./login.component.html',
    styleUrls: ['login.component.css'],
})

export class LoginComponent implements OnInit, OnDestroy{
userNow:any;
theForm: FormGroup;

constructor( private router: Router, private formBuilder: FormBuilder, private authService: AuthService,private  authToken :TokenManager) {

  }


  ngOnInit(){
 this.theForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(64)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(32)])]
    });
  }  
  ngOnDestroy(){

  }
  onSubmit() {
     console.log("user ");

 this.authService.login( this.theForm.value )
.subscribe(user => {
  console.log(user);
       this.userNow=this.authToken.getToken();
       if (this.userNow ){
           this.authToken.removeToken()
           this.authToken.setToken(user);
          this.router.navigateByUrl('/home');
       }else{
        this.authToken.setToken(user);

         this.router.navigateByUrl('/home');
       }
      },

      error => {if(error)
         console.error(error)
         
   });
  }
  register(){
      
       this.router.navigateByUrl('/register');
    }
}