import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent}            from './app.component';
import {LoginComponent}         from './login/index';
import {RegisterComponent}         from './register/index';
import {NoteComponent}            from  './note/index';
import {ArchiveComponent} from './archive/index';
import {TrashComponent} from './trash/index';
import {ReminderComponent} from './reminder/index';
const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'note', component: NoteComponent },
  { path: 'archive', component: ArchiveComponent },
  { path: 'trash', component: TrashComponent },
  { path: 'reminder', component: ReminderComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
})
export class AppRoutingModule {}

/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
