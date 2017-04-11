import { Component, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Headers, Response } from '@angular/http';
import { AuthenticationService } from '../_services/index';
// import { DateTimePickerModule } from 'ng2-date-time-picker';
@Component({
  selector: 'reminder',
  templateUrl: 'assets/app/reminder/reminder.component.html',
  styleUrls: ['assets/app/stylesheets/Reminder.css', 'assets/app/stylesheets/start1.css', 'assets/app/stylesheets/note3.css',
    'assets/app/stylesheets/simple-sidebar.css', 'assets/app/stylesheets/bootstrap-datetimepicker.min.css',
    'assets/app/bootstrap/css/bootstrap.min.css', 'assets/app/font-awesome/css/font-awesome.min.css',
    'assets/app/bootstrap/css/bootstrap-theme.min.css'],
})
export class ReminderComponent implements AfterViewInit {
  public data: any = {};
  public postsReminder: Object = [];
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private http: Http) {
    this.getReminder();
    this.authenticationService.getusername()
      .subscribe(
        data => {
          this.data.user = data;
        });
    this.data = { id: this.data.id, title: this.data.title, user: this.data.user,
      content: this.data.content, reminder: this.data.reminder};
  }
  public logout() {
    this.authenticationService.logout()
      .subscribe(
        data => {
          this.router.navigate(['/logout']);
        },
        error => {
          this.data.alertMessage = error._body;
        });
  }
  public ngAfterViewInit() {
    let element = document.getElementById('wrapper');
    let trigger = document.getElementById('menu-toggle');
    trigger.addEventListener('click', function(e) {
      e.preventDefault();
      element.classList.toggle('toggled');
      let eleDiv = document.getElementById('ver');
      if (eleDiv.style.visibility === 'visible') {eleDiv.style.visibility = 'hidden'; } else {
        eleDiv .style.visibility = 'visible'; }
    });
  }
  public getReminder() {
    this.authenticationService.getReminder()
      .subscribe(arg => this.postsReminder = arg );
  };
}
