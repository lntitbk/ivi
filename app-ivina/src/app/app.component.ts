import { Component, ElementRef, ViewChild } from '@angular/core';
import { ImageLiveComponent } from './camera/image-live/image-live.component';
import {environment} from './../environments/environment';
import { VideoLiveComponent } from './camera/video-live/video-live.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(ImageLiveComponent) imageComponent : ImageLiveComponent;
  @ViewChild(VideoLiveComponent) videoComponent: VideoLiveComponent;
  title = 'app-ivina';
  isCamera = false;
  openCamera() {
      console.log(environment.apiUrl);
      if(!!this.imageComponent) {
        this.imageComponent.openCamera();
      }
      if (!!this.videoComponent) {
        this.videoComponent.fire();
      }
  }
}
