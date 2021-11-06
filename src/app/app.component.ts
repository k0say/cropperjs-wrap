import { Component, ViewChild } from '@angular/core';
import { CropperComponent } from './cropper/cropper.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild("cropper", {static: false}) imageElement: CropperComponent;

  image = undefined;
  // image = './assets/picture.jpg';

  open(event) {
    this.imageElement.fileChangeEvent(event)
  }

  clear() {
    this.imageElement.clear();
  }

}
