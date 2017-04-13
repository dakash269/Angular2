import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';
import {Location} from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {NoteComponent} from '../note/note.component';
@Injectable()
export class AuthenticationService {
    constructor(private http: Http, private location: Location, private router: Router,
    ) {
    }
    public register(userName: string, userEmail: string, userPassword: string) {
      return this.http.post('/api/authenticate', { userName: userName, userEmail: userEmail, userPassword: userPassword });
    }
  public set(count: number) {
    return this.http.post('/api', { count: count });
  }
  public login(count: number, userEmail: string, userPassword: string) {
    return this.http.post('/api/go', { count: count, userEmail: userEmail, userPassword: userPassword });
  }

  public sendData(user: string, title: string, content: string, reminder: string) {
    return this.http.post('/api/postdata', { user: user, title: title, content: content, reminder: reminder });
  }
  public del(id: string) {
    return this.http.post('/del', { id: id });
  }
  public archive(id: string) {
    return this.http.post('/archive', { id: id });
  }
  public delA(id: string) {
    return this.http.post('/delA', { id: id });
  }
  public unarchive(id: string) {
    return this.http.post('/unarchive', { id: id });
  }
  public delT(id: string) {
    return this.http.post('/delT', { id: id });
  }
  public movetonote(id: string) {
    return this.http.post('/movetonote', { id: id });
  }

  public  getusername() {
      return this.http.get('/getusername').map((res: Response) => { return res.text(); });
  }
public logout() {
    return this.http.get('/logout').map((res: Response) => { return res.text(); });
  }
  public  getUser() {
    return this.http.get('/api/get').map((res: Response) => { return res.json(); });
  }
  public  getReminder() {
    return this.http.get('/api/getReminder').map((res: Response) => { return res.json(); });
  }
  public  getArchive() {
    return this.http.get('/api/getArchive').map((res: Response) => { return res.json(); });
  }
  public  getTrash() {
    return this.http.get('/api/getTrash').map((res: Response) => { return res.json(); });
  }
}
