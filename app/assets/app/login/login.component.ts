import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Headers, Response } from '@angular/http';
import { AlertService, AuthenticationService } from '../_services/index';

@Component({
    // moduleId: module.id,
  selector: 'log',
    templateUrl: 'assets/app/login/login.component.html',
})

export class LoginComponent  {
  public data: any = {};
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private http: Http) {
    this.data = { userEmail: this.data.userEmail,
      userPassword: this.data.userPassword, alertMessage: this.data.alertMessage}; }
  public login() {
    this.authenticationService.login(this.data.userEmail, this.data.userPassword)
      .subscribe(
        data => {
          this.router.navigate(['/note']);
        },
        error => {
          console.log(error);
          this.data.alertMessage = error._body;
        });
  }
}
