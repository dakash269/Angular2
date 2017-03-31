import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import {Location} from '@angular/common';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {
    constructor(private http: Http, private location: Location) { }
    public register(userName: string, userEmail: string, userPassword: string) {
      return this.http.post('/api/authenticate', { userName: userName, userEmail: userEmail, userPassword: userPassword });
    }
  public login(userEmail: string, userPassword: string) {
    return this.http.post('/api/go', { userEmail: userEmail, userPassword: userPassword });
  }
  public sendData(user: string, title: string, content: string, reminder: string) {
    return this.http.post('/api/postdata', { user: user, title: title, content: content, reminder: reminder });
  }
}
