import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Headers, Response } from '@angular/http';
import { AuthenticationService } from '../_services/index';
@Component({
  selector: 'note',
  templateUrl: 'assets/app/note/note1.component.html',
  styleUrls: ['assets/app/stylesheets/note.css', 'assets/app/stylesheets/start.css', 'assets/app/stylesheets/note2.css',
    'assets/app/stylesheets/simple-sidebar.css', 'assets/app/stylesheets/bootstrap-datetimepicker.min.css',
    'assets/app/bootstrap/css/bootstrap.min.css', 'assets/app/font-awesome/css/font-awesome.min.css',
    'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',
    'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/cs/bootstrap-theme.min.css'],
})
export class NoteComponent {
  public data: any = {};
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private http: Http) {
    this.data = { title: this.data.title, user: this.data.user,
      content: this.data.content, reminder: this.data.reminder}; }
    public sendData() {
    console.log('hi');
    this.authenticationService.sendData(this.data.user, this.data.title, this.data.content, this.data.reminder)
        .subscribe(
          data => {
            console.log(this.data);
            console.log(data);
            // public getPosts() {};
          });
    };
}
