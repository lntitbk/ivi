import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageLiveComponent } from './image-live/image-live.component';
import {SocketioService} from '../shared/service/socketio.service';
import { VideoLiveComponent } from './video-live/video-live.component';
import { VideoLiveAnswerComponent } from './video-live-answer/video-live-answer.component';
import { VideoLiveOfferComponent } from './video-live-offer/video-live-offer.component';


@NgModule({
  declarations: [ImageLiveComponent, VideoLiveComponent, VideoLiveAnswerComponent, VideoLiveOfferComponent],
  imports: [
    CommonModule
  ],
  exports: [ImageLiveComponent, VideoLiveComponent],
  providers: [SocketioService]
})

export class CameraModule { }
