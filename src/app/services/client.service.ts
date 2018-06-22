import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Client } from '../models/client.model';

@Injectable()
export class ClientService {
  private url = 'http://localhost:3000/api/master/client';  // URL to web api
  private clients : Client;
  constructor(private http: HttpClient) { }
  createAuthorizationHeader(headers: HttpHeaders) {
    headers.append('Content-Type', 'application/json'); 
  }
  getAllClient() {
    let headers = new HttpHeaders();
    this.createAuthorizationHeader(headers);
    return this.http
      .get<Client[]>(this.url, {headers})
      .map(res => {
        return res;
    });
      
  }

  getClient(id:string) {
    let headers = new HttpHeaders();
    this.createAuthorizationHeader(headers);
    return this.http
      .get<Client>(this.url + "?id=" +id, {headers})
      .map(res => {
        return res;
    });
      
  }

  postClient(client:Client){
    var obj = JSON.stringify(client);
    let headers = new HttpHeaders();
    this.createAuthorizationHeader(headers);
    return this.http
      .post<Client>(this.url, client, {headers})
      .map(res => {
        if(res)
          console.log(res);
        return res;
    });
  }

  putClient(client:Client){
    var obj = JSON.stringify(client);
    let headers = new HttpHeaders();
    this.createAuthorizationHeader(headers);
    return this.http
      .put<Client>(this.url + "/" + client.klien_id, client, {headers})
      .map(res => {
        if(res)
          console.log(res);
        return res;
    });
  }

  deleteClient(client:Client){
    var obj = JSON.stringify(client);
    let headers = new HttpHeaders();
    this.createAuthorizationHeader(headers);
    return this.http
      .delete<Client>(this.url + "/" + client.klien_code, {headers})
      .map(res => {
        if(res)
          console.log(res);
        return res;
    });
  }
}
