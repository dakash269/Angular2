import './rxjs-extensions';

import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import {RouterModule} from '@angular/router';
import {Location} from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent }         from './app.component';
import { LoginComponent }         from './login/index';
import { RegisterComponent }         from './register/index';
import {NoteComponent} from './note/index';
import {  AuthenticationService, AlertService  } from './_services/index';
import {TrashComponent} from './trash/index';
import {ReminderComponent} from './reminder/index';
import {ArchiveComponent} from './archive/index';
// import { NguiDatetimePickerModule } from '@ngui/datetime-picker';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    RouterModule,
    // NguiDatetimePickerModule,
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NoteComponent,
    ArchiveComponent,
    TrashComponent,
    ReminderComponent,
  ],
  providers: [
    AuthenticationService, AlertService, Location ],
  bootstrap: [ AppComponent],
})
export class AppModule { }

/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
