import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SecurityContext, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import Cropper from 'cropperjs';



@Component({
  selector: 'app-cropper',
  templateUrl: './cropper.component.html',
})
export class CropperComponent implements OnInit, AfterViewInit, OnChanges {

  private cropper: Cropper;

  @ViewChild("cropper", { static: false }) imageElement: ElementRef;

  @Input() imageSource: HTMLImageElement;
  // @Input("src") imageSource: string | SafeUrl;
  @Input("width") width;
  @Input("height") height;

  @Input() cropperOptions: Object;

  @Output() imageSourceChange: EventEmitter<any> = new EventEmitter();

  imageDestination: string;

  imageConfig = {};

  data;

  constructor(private sanitization: DomSanitizer) {
    this.imageDestination = '';
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes['clear']) {
      this.imageSource = null
    }
  }

  ngAfterViewInit(): void {

    this.cropper = new Cropper(this.imageElement.nativeElement, {
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



  fileChangeEvent(event: any): void {
    // this.imageSource = URL.createObjectURL(event.target.files[0]);
    // this.imageElement.nativeElement = event.target.files[0];
    /**
     *  quello buono!
     */
    let fileInput = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(fileInput);
    reader.onloadend = function (e) {
      var image = new Image();
      image.src = e.target.result as string;
      image.onload = function (ev) {
        let canvas = <HTMLCanvasElement>document.getElementById('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        var ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0);
        new Cropper(canvas)
      }
    }
  }
}
