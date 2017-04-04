import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Headers, Response } from '@angular/http';
import { AuthenticationService } from '../_services/index';
// import { DateTimePickerModule } from 'ng2-date-time-picker';
@Component({
  selector: 'trash',
  templateUrl: 'assets/app/trash/trash.component.html',
  styleUrls: ['assets/app/stylesheets/Trash.css', 'assets/app/stylesheets/start1.css', 'assets/app/stylesheets/note3.css',
    'assets/app/stylesheets/simple-sidebar.css', 'assets/app/stylesheets/bootstrap-datetimepicker.min.css',
    'assets/app/bootstrap/css/bootstrap.min.css', 'assets/app/font-awesome/css/font-awesome.min.css',
    'assets/app/bootstrap/css/bootstrap-theme.min.css'],
})
export class TrashComponent {
  public data: any = {};
  public posts: Object = [];
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private http: Http) {
    this.getTrash();
    this.data = { id: this.data.id, title: this.data.title, user: this.data.user,
      content: this.data.content, reminder: this.data.reminder};
  }
  public getTrash() {
    this.authenticationService.getTrash()
      .subscribe(arg => this.posts = arg);
  };
  public delT(id: string ) {
    if (window.confirm('Are you sure?')) {
      this.authenticationService.delT(id)
        .subscribe(
          data => {
            this.getTrash();
          });
    }
  };
  public movetonote(id: string ) {
    if (window.confirm('Are you sure?')) {
      this.authenticationService.movetonote(id)
        .subscribe(
          data => {
            this.getTrash();
            this.router.navigate(['/note']);
          });
    }
  };
}
