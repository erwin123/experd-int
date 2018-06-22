import { Injectable } from '@angular/core';
import { Account } from '../models/account.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class AppfirstService {

  private urlListCandidate = 'https://app.assessfirst.com/api/candidate';  // URL to web api
  private secretKey = 'nfpaQ0uwFDxY6bSR+PWpZNygSahlA5eV8PG5h4+bJtY=';
  private publicKey = '';

  private account : Account;
  constructor(private http: HttpClient) { }

  signature(method, uri)
  {
    return method+":"+uri+":1";
  }

  createAuthorizationHeader(headers: HttpHeaders, signature:string) {
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', signature);
    headers.append('X-Af-Timestamp', '1');
    headers.append('Access-Control-Max-Age', '10000');
    console.log(headers);
  }

  getCandidates(email) {
    let headers = new HttpHeaders();
    let indexApi = this.urlListCandidate.indexOf("api");
    let uri = this. urlListCandidate.substring(indexApi-1, this.urlListCandidate.length);

    let stringSign = this.signature("GET", uri);

    let ciphertext = CryptoJS.HmacSHA1(stringSign, this.secretKey);

    var base64 = CryptoJS.enc.Base64.stringify(ciphertext);
    let params = new HttpParams().set('email', email);
    var authString = 'AF'+this.publicKey +':'+base64;

    //this.createAuthorizationHeader(headers,authString);
    let headerss = new HttpHeaders();
    headerss = headers.set('Accept', 'application/json')
    .set('Authorization', authString)
    .set('X-Af-Timestamp', '1');
              

    const options = { params: params, headers: headerss };
    console.log(options);
    return this.http
      .get(this.urlListCandidate,options)
      .map(res => {
        if (res) {
            console.log(res);
        }
        return res;
    });
  }

}
