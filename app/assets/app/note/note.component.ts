import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { AuthenticationService } from '../_services/index';
import {ModelComponent} from '../model/model.component';
import 'rxjs/add/operator/map';
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
  private big = true;
  private get myStyles(): any {
    return {
      'font-size' : this.big ? '30px' : '7px',
    };
  }
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private modelContent: ModelComponent,
    private http: Http) {
    this.getPosts();
    console.log(screen.width);
    this.edited = false;
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
public mod() {
  // if (window.confirm('Are you sure?')) {
  // }
  let element = document.getElementById('a');
  if (element.style.visibility === 'visible') {element.style.visibility = 'hidden'; } else {
    element .style.visibility = 'visible'; }
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
