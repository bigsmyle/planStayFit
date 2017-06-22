import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from "@angular/router";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable()
export class NoteService {
     
        
       
 constructor(private http: Http, private router: Router) { }




delete(note: any): Observable<any> {
  
        return this.http.post('deleteNote', note)
            .map((response: Response) => <any>response.json())

            .catch(this.handleError);
    };
  edit(note: any): Observable<any> {
  
        return this.http.post('editNote', note)
            .map((response: Response) => <any>response.json())

            .catch(this.handleError);
    };
 add( note:any): Observable<any> {
        
        return this.http.post('addNote',note )
            .map((response: Response) => <any>response.json())

            .catch(this.handleError);

    }

    getNotes(email:any): Observable<any> {
        
        return this.http.post('notes',{email:email} )
            .map((response: Response) => <any>response.json())

            .catch(this.handleError);

    }
    private handleError(error: Response) {
        return Observable.throw(error.json().error || 'Server error');
    }

}