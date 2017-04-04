import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Headers, Response } from '@angular/http';
import { AuthenticationService } from '../_services/index';
@Component({
  selector: 'note',
  templateUrl: 'assets/app/note/note.component.html',
  styleUrls: ['assets/app/stylesheets/note.css', 'assets/app/stylesheets/start.css', 'assets/app/stylesheets/note2.css',
    'assets/app/stylesheets/simple-sidebar.css', 'assets/app/stylesheets/bootstrap-datetimepicker.min.css',
    'assets/app/bootstrap/css/bootstrap.min.css', 'assets/app/font-awesome/css/font-awesome.min.css',
    'assets/app/bootstrap/css/bootstrap-theme.min.css'],
})
export class NoteComponent implements AfterViewInit  {
  public data: any = {};
  public posts: Object = [];
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private http: Http) {
    this.getPosts();
    this.data = { id: this.data.id, title: this.data.title, user: this.data.user,
      content: this.data.content, reminder: this.data.reminder};
  }

  public ngAfterViewInit() {
    let element = document.getElementById('wrapper');
    let trigger = document.getElementById('menu-toggle');
    trigger.addEventListener('click', function(e) {
      e.preventDefault();
      element.classList.toggle('toggled');
    });
  }
    public sendData() {
    this.authenticationService.sendData(this.data.user, this.data.title, this.data.content, this.data.reminder)
        .subscribe(
          data => {
            this.authenticationService.getUser();
            this.getPosts();
          });
    };
  public getPosts() {
    this.authenticationService.getUser()
      .subscribe(arg => this.posts = arg);
  };
  public del(id: string ) {
    if (window.confirm('Are you sure?')) {
       this.authenticationService.del(id)
         .subscribe(
           data => {
             this.getPosts();
             this.router.navigate(['/trash']);
           });
    }
  };
  public archive(id: string ) {
    if (window.confirm('Are you sure?')) {
      this.authenticationService.archive(id)
        .subscribe(
          data => {
            this.getPosts();
            this.router.navigate(['/archive']);
          });
    }
  };
}
