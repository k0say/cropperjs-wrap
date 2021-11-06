import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { CropperComponent } from './cropper/cropper.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild("cropper", {static: false}) imageElement: CropperComponent;

  image = undefined;


  open(event) {
    this.imageElement.fileChangeEvent(event)
  }

  clear(event) {
    console.log(event)

  }

}
