import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, SecurityContext, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import Cropper from 'cropperjs';



@Component({
  selector: 'app-cropper',
  templateUrl: './cropper.component.html',
})
export class CropperComponent implements OnInit, AfterViewInit {

  /**
    const nw = this.cropper['element'].naturalWidth;
    const nh = this.cropper['element'].naturalHeight;
   */

  private cropper: Cropper;

  @ViewChild("cropper", {static: false}) imageElement: ElementRef;

  @Input("src") imageSource: HTMLImageElement;
  // @Input("src") imageSource: string | SafeUrl;
  @Input() cropperOptions: Object;
  @Input("width") width;
  @Input("height") height;


  @Output() imageChanged: EventEmitter<any> = new EventEmitter();
  imageDestination: string;

  imageConfig = {};

  data;

  constructor(private sanitization: DomSanitizer) {
    this.imageDestination = '';
  }

  ngAfterViewInit(): void {

    this.cropper = new Cropper(this.imageElement.nativeElement,{
      zoomable: true,
      scalable: false,
      aspectRatio: 1,
      cropBoxResizable: true,
      cropBoxMovable: true,
      dragMode: "move",
      viewMode: 3,
      crop: () => {
        const canvas = this.cropper.getCroppedCanvas();
        this.imageDestination = canvas.toDataURL();
        this.data = this.cropper.getCropBoxData();
      },
    });

  }

  ngOnInit(): void {
  }

  clear() {
    this.imageSource = null;
  }

  fileChangeEvent(event: any): void {
    // this.imageSource = URL.createObjectURL(event.target.files[0]);
    // this.imageElement.nativeElement = event.target.files[0];
    /**
     *  quello buono!
     */
    // // const val: string = URL.createObjectURL(event.target.files[0]);
    // this.imageChanged.emit(this.imageSource);
    // this.cropper = new Cropper(this.imageSource, )
    // // this.imageDestination = this.sanitization.sanitize(SecurityContext.STYLE,event.target.files[0]);

    let fileInput = event.target.files[0];
    var reader  = new FileReader();
    reader.readAsDataURL(fileInput);
    reader.onloadend = function (e) {
      var image = new Image();
      image.src = e.target.result as string;
      image.onload = function(ev) {
        let canvas =  <HTMLCanvasElement> document.getElementById('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        var ctx = canvas.getContext('2d');
        ctx.drawImage(image,0,0);
        new Cropper(canvas)
      }
    }


    // this.cropper = new Cropper(this.imageElement.nativeElement)
 }
}
