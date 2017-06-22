import { Injectable } from "@angular/core";

@Injectable()
export class TokenManager {

userToken = 'userToken';
 cachedToken:any ;

 constructor(  ){}

     setToken(token: any){
          this.cachedToken = token;
          localStorage.setItem(this.userToken,JSON.stringify(token));
      }
      getToken(){
          if(!this.cachedToken){
              this.cachedToken = JSON.parse(localStorage.getItem(this.userToken));
          }
          return this.cachedToken;
      }
    
      removeToken(){
          this.cachedToken = null;
          localStorage.removeItem(this.userToken);
      }

}