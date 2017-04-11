import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Headers, Response } from '@angular/http';
import { AuthenticationService } from '../_services/index';

@Component({
    selector: 'reg',
    templateUrl: 'assets/app/register/register.component.html',
  styleUrls: ['assets/app/stylesheets/login.css'],
})
export class RegisterComponent {
  public data: any = {};
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private http: Http) {
    this.data = { userName: this.data.userName, userEmail: this.data.userEmail,
      userPassword: this.data.userPassword, alertMessage1: this.data.alertMessage1}; }
  public register() {
    console.log(this.data);
    this.authenticationService.register(this.data.userName, this.data.userEmail, this.data.userPassword)
      .subscribe(
        data => {
          console.log('data');
          // location.pathname = '/note1';
          this.router.navigate(['/note']);
        },
        error => {
          console.log(error);
          this.data.alertMessage1 = error._body;
        });
  }
}
