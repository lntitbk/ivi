import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
// import {RecordRTC} from 'recordrtc';
import { SocketioService } from 'src/app/shared/service/socketio.service';
import { CameraModule } from '../camera.module';
// declare var RecordRTC: any;
declare var MediaStreamRecorder : any;
// declare var io : any;

@Component({
  selector: 'app-image-live',
  templateUrl: './image-live.component.html',
  styleUrls: ['./image-live.component.css']
})
export class ImageLiveComponent implements OnInit {
  private blobs = [];
  private recorder : any;
  private constraints = {
    audio: false,
    video: true
  };
  
  public isCamera : Boolean;
  private camera : any;
  @ViewChild('cam') video : ElementRef;
  @ViewChild('view') photo : ElementRef;
  constructor(private WebsocketService: SocketioService) { 
    this.WebsocketService.listen('sms').subscribe();
  }

  ngOnInit(): void {
    this.isCamera = false;
    this.WebsocketService.listen('send-sms').subscribe((data) => {
      console.log('---------on------------');
      console.log(data);
    });
    // console.log(this.WebsocketService.socket);
  }
  
  captureCamera(callback) {
    navigator.mediaDevices.getUserMedia(this.constraints)
    .then((camera) => {callback(camera);})
    .catch(err => {
      alert("'Unable to capture your camera. Please check console logs.'");
      console.error(err);
    });
  }

  openCamera() {
    // var socket = io("http://127.0.0.1:3000");
    // console.log(socket);
    if (!this.isCamera) {
      this.captureCamera( (camera) => {
        this.camera = camera;
        this.video.nativeElement.srcObject = camera;
        this.video.nativeElement.play();
        console.log(this.video.nativeElement.srcObject);
      });
    }
    this.isCamera = !this.isCamera;
  }
  sendSMS() {
    this.WebsocketService.emit('sms', 'xin chao');
  }
  closeCamera() {
      if (this.isCamera) {
        this.camera.stop();
      }
  }

  uploadPhoto() {
    this.closeCamera();
  }

  takePhoto() {
    const width = this.photo.nativeElement.width = this.video.nativeElement.videoWidth;
    const height = this.photo.nativeElement.height = this.video.nativeElement.videoHeight;
    this.photo.nativeElement.getContext('2d').drawImage(this.video.nativeElement, 0, 0, width, height);
  }
}
