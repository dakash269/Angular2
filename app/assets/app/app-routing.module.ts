import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent}            from './app.component';
import {LoginComponent}         from './login/index';
import {RegisterComponent}         from './register/index';
import {NoteComponent}            from  './note/index';
import {ArchiveComponent} from './archive/index';
import {TrashComponent} from './trash/index';
import {ReminderComponent} from './reminder/index';
// import { AuthGuard } from './guards/index';
const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'note', component: NoteComponent },
  // { path: 'note', component: NoteComponent, canActivate: [AuthGuard]  },
  { path: 'archive', component: ArchiveComponent },
  { path: 'trash', component: TrashComponent },
  { path: 'reminder', component: ReminderComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LoginComponent },
  { path: 'note', redirectTo: 'note' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
})
export class AppRoutingModule {}
