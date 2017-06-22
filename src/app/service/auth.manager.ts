import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from "@angular/router";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch'
import { TokenManager } from './token.manager';


@Injectable()
export class AuthService {
    email: any;
    password: any;


    constructor(private http: Http, private router: Router, private authToken: TokenManager) { }


    getPlaces(origin: any): Observable<any> {

        var latitude = origin.latitude;
        var longitude = origin.longitude;
        return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&key=AIzaSyC-rvT4Mr-bzPCgnr4fSAY74y6THmEvDnQ',
        )
            .map((response: Response) => <any>response.json())

            .catch(this.handleError);
    };


    login(user: any): Observable<any> {

        this.email = user.username;
        this.password = user.password;
        return this.http.post('login', { email: this.email, password: this.password })
            .map((response: Response) => <any>response.json())

            .catch(this.handleError);
    };


    register(user: any): Observable<any> {
        return this.http.post('register', user)
            .map((response: Response) => <any>response.json())

            .catch(this.handleError);

    }
    private handleError(error: Response) {
        return Observable.throw(error.json().error || 'Server error');
    }

}