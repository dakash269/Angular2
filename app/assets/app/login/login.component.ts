import { Component } from '@angular/core';
// import { tokenNotExpired } from 'angular2-jwt';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Headers, Response } from '@angular/http';
import { AlertService, AuthenticationService } from '../_services/index';

@Component({
    // moduleId: module.id,
  selector: 'log',
    templateUrl: 'assets/app/login/login.component.html',
  styleUrls: ['assets/app/stylesheets/login.css'],
})

export class LoginComponent  {
  public data: any = {};
  public count: number = 1;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private http: Http) {
    this.authenticationService.getusername()
      .subscribe(
        data => {
          this.data.user = data;
        });
    this.data = { count: this.count, userEmail: this.data.userEmail,
      userPassword: this.data.userPassword, alertMessage: this.data.alertMessage}; }

  public login() {
    this.authenticationService.getusername()
      .subscribe(
        data => {
          this.data.user = data;
        });
    // this.authenticationService.set(this.data.count)
    //   .subscribe(
    //     data => {
    //       console.log(data);
    //     },
    //     error => {
    //       console.log(error);
    //       this.data.alertMessage = error._body;
    //     });
    this.authenticationService.login(this.data.count, this.data.userEmail, this.data.userPassword)
      .subscribe(
        data => {
          console.log('data');
          // return this.http.get('/note');
          this.router.navigate(['/note']);
        },
        error => {
          console.log(error);
          this.data.alertMessage = error._body;
        });
  }
}
