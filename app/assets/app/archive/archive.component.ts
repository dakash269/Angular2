import { Component, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Headers, Response } from '@angular/http';
import { AuthenticationService } from '../_services/index';
// import { DateTimePickerModule } from 'ng2-date-time-picker';
@Component({
  selector: 'archive',
  templateUrl: 'assets/app/archive/archive.component.html',
  styleUrls: ['assets/app/stylesheets/Archive.css', 'assets/app/stylesheets/start1.css', 'assets/app/stylesheets/note3.css',
    'assets/app/stylesheets/simple-sidebar.css', 'assets/app/stylesheets/bootstrap-datetimepicker.min.css',
    'assets/app/bootstrap/css/bootstrap.min.css', 'assets/app/font-awesome/css/font-awesome.min.css',
    'assets/app/bootstrap/css/bootstrap-theme.min.css'],
})
export class ArchiveComponent implements AfterViewInit {
  public data: any = {};
  public posts: Object = [];
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private http: Http) {
    this.getArchive();
    this.authenticationService.getusername()
      .subscribe(
        data => {
          this.data.user = data;
        });
    this.data = { id: this.data.id, title: this.data.title, user: this.data.user,
      content: this.data.content, reminder: this.data.reminder};
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
  public getArchive() {
    this.authenticationService.getArchive()
      .subscribe(arg => this.posts = arg);
  };
  public delA(id: string ) {
    if (window.confirm('Are you sure?')) {
      this.authenticationService.delA(id)
        .subscribe(
          data => {
            this.getArchive();
          });
    }
  };
  public unarchive(id: string ) {
    if (window.confirm('Are you sure?')) {
      this.authenticationService.unarchive(id)
        .subscribe(
          data => {
            this.getArchive();
          });
    }
  };
}
