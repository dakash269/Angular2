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
export class NoteComponent implements AfterViewInit {
  public data: any = {};
  public posts: Object = [];
  public edited: any = {};
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private http: Http) {
    this.getPosts();
    this.edited = false;
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
    });
  }
  public sendData() {
    this.edited = false;
    this.authenticationService.getusername()
  .subscribe(
      data => {
        this.data.user = data;
      });
    this.authenticationService.sendData(this.data.user, this.data.title, this.data.content, this.data.reminder)
      .subscribe(
        data => {
          this.authenticationService.getUser();
          this.getPosts();
        });
  }
  public onFocus() {
    this.edited = true;
  }
  public getPosts() {
    this.authenticationService.getUser()
      .subscribe(arg => {
        this.posts = arg;
        let now = new Date();
        for (let p of arg) {
          let date = new Date(p.reminder);
          let x = (date.getTime() - now.getTime());
          // console.log(now + ' ' + date + p.reminder );
          if (x > 0) {
            setTimeout(() => { alert('Hi! Akash you have some work ' ); }, x);
          }
        }
      });
  };
  public del(id: string ) {
    if (window.confirm('Are you sure?')) {
      this.authenticationService.del(id)
        .subscribe(
          data => {
            this.getPosts();
          });
    }
  };
  public archive(id: string ) {
    if (window.confirm('Are you sure?')) {
      this.authenticationService.archive(id)
        .subscribe(
          data => {
            this.getPosts();
          });
    }
  };
}
