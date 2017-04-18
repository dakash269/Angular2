import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { AuthenticationService } from '../_services/index';
import {ModelComponent} from '../model/model.component';
import 'rxjs/add/operator/map';
// import { NguiDatetimePickerModule } from '@ngui/datetime-picker';
@Component({
  selector: 'note',
  templateUrl: 'assets/app/note/note.component.html',
  styleUrls: [ 'assets/app/stylesheets/main.css', 'assets/app/bootstrap/css/bootstrap.min.css', 'assets/app/bootstrap/css/bootstrap-theme.min.css'],
})
export class NoteComponent implements AfterViewInit {
  public data: any = {};
  public posts: Object = [];
  public selectedIdx: number;
  public edited: any = {};
  public big = true;
  public fo = true;
  public isOne = false;
  public isTwo = false;
  public isThree = true;
  private get myStyles(): any {
    return {
      'font-size' : this.fo ? '30px' : '15px',
    };
  };
  private get sty(): any {
    return {
    'border-top' : this.big ? '2px dotted rgba(0,0,0,0.15)' : '0 dotted rgba(0,0,0,0)',
    };
  };
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private modelContent: ModelComponent,
    private http: Http) {
    this.getPosts();
    // this.selectItem(this.selectedIdx);
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

  public sendData() {
    this.edited = false;
    // this.big = this.data.reminder !== undefined;
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
  public selectItem(index: number) {
    this.selectedIdx = index;
    console.log(this.selectedIdx);
  }
  public getPosts() {
    this.authenticationService.getUser()
      .subscribe(arg => {
            for (let p of arg) {
              if (p.content.length > 5 && p.content.length < 10) {
                this.isOne = true; this.isTwo = false; this.isThree = false;
              }
              if (p.content.length > 10) {
                this.isTwo = true; this.isThree = false; this.isOne = false;
              }
              if (p.content.length < 5) {
                this.isThree = true; this.isOne = false; this.isTwo = false;
              }
              this.fo = p.title.length < 10;
              // this.big = p.reminder !== '';
              this.posts = arg;
             }
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
}
