import { Component }          from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {NgForm} from '@angular/forms';
import {  AuthenticationService} from './_services/index';
import { HttpModule }    from '@angular/http';
import {RouterModule} from '@angular/router';
import { Http, Headers, Response } from '@angular/http';
import {Location} from '@angular/common';
@Component({
  selector: 'my-app',
  template: `
      <router-outlet></router-outlet>
  `,
})
export class AppComponent {
}
