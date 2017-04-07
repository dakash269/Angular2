import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import 'rxjs/add/operator/map';
@Component({
  selector: 'model',
  template: `<button id="myBtn2">Open Modal</button>
                <div id="myModal" class="modal">
                    <div class="modal-content">
                      <span class="close">&times;</span>
                      <p>Some text in the Modal..</p>
                    </div></div>`,
})
@Injectable()
export class ModelComponent {
  public open() {
    let modal = (<HTMLInputElement> document.getElementById('MyModal'));
    // modal.open();
    let btn = document.getElementById('myBtn2');
    let span = document.getElementById('close');
    btn.onclick = function() {
    modal.style.display = 'block'; };
    span.onclick = function() {
    modal.style.display = 'none'; };
    window.onclick = function(event) {
    if (event.target === modal) {
      modal.style.display = 'none'; }}; }
}
