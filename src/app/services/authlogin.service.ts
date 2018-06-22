import { Injectable } from '@angular/core';
import { Account } from '../models/account.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class AuthloginService {

  private url = 'http://localhost:3000/api/um/useraccount';  // URL to web api

  private account : Account;
  constructor(private http: HttpClient) { }


  createAuthorizationHeader(headers: HttpHeaders) {
    headers.append('Content-Type', 'application/json'); 
  }

  login(username: string, password: string, rememberMe: boolean) {
    let headers = new HttpHeaders();
    this.createAuthorizationHeader(headers);
    return this.http
      .post(this.url+'/login', { username: username, password: password, rememberme: rememberMe }, {headers})
      //.map(res =>res.json());
      .map(res => {
        // login successful if there's a jwt token in the response
        if (res) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(res));
        }
        return res;
    });
      
  }

  loginbysession() {
    let headers = new HttpHeaders();
    this.createAuthorizationHeader(headers);
    return this.http
      .post(this.url+'/loginbysession', {  }, {headers})
      //.map(res =>res.json());
      .map(res => {
        // login successful if there's a jwt token in the response
        if (res) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(res));
        }

        return res;
    });
  }
 
  logout() {
    localStorage.removeItem('currentUser');
    let headers = new HttpHeaders();
    this.createAuthorizationHeader(headers);
    return this.http
      .post(this.url+'/logout', {  }, {headers})
      //.map(res =>res.json());
      .map(res => {
        // login successful if there's a jwt token in the response
        if (res) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(res));
        }
        return res;
    });
  }
}
