import { Component } from '@angular/core';
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
export class ReminderComponent {
}
