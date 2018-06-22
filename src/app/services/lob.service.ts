import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Client } from '../models/client.model';
import { Lob } from '../models/lob.model';

@Injectable()
export class LobService {
  private url = 'http://localhost:3000/api/master/lob';  // URL to web api
  private lobs : Lob;
  constructor(private http: HttpClient) { }
  createAuthorizationHeader(headers: HttpHeaders) {
    headers.append('Content-Type', 'application/json'); 
  }
  getlob() {
    let headers = new HttpHeaders();
    this.createAuthorizationHeader(headers);
    return this.http
      .get<Lob[]>(this.url, {headers})
      .map(res => {
        return res;
    });
      
  }

}
