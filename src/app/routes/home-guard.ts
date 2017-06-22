import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { TokenManager } from '../service/token.manager';


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private  authToken :TokenManager) {
        
    }
    canActivate(): Observable<boolean> | boolean{
   
      if (this.authToken.getToken()) {
            return true;
        }else{

        this.router.navigate(['/login']);
        return false;

        }

    
    }
}