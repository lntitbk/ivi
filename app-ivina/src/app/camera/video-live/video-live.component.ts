import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SocketioService } from 'src/app/shared/service/socketio.service';
import { SignallingService } from 'src/app/shared/service/signalling.service';
import { WebRTCEvent, CallEvent } from '../../shared/service/VideoConstain';
// declare var RTCPeerConnection: any;
declare var RTCSessionDescription: any;
declare var adapter: any;
@Component({
  selector: 'app-video-live',
  templateUrl: './video-live.component.html',
  styleUrls: ['./video-live.component.css']
})
export class VideoLiveComponent implements OnInit {
  private peerConnection: RTCPeerConnection;
  private localVideo: any;
  private remoteVideo: any;
  @ViewChild('localVideo') localVideoRef: ElementRef;
  @ViewChild('remoteVideo') remoteVideoRef: ElementRef;
  private iceConfiguration = {
    iceServers: [
      { "urls": "stun:stun.l.google.com:19302" }
    ]
  };

  constructor(private WebsocketService: SocketioService, private signllingService: SignallingService) {
  }

  ngOnInit(): void {
    this.signllingService.subcribe("offer").subscribe((data) => { 
      this.onOffer(data);
    });
    this.signllingService.subcribe("candidate").subscribe((data) => {
      console.log('----------candidate-----------------');
      this.peerConnection.addIceCandidate(new RTCIceCandidate(data));
      console.log(data);
    });
    this.signllingService.subcribe("answer").subscribe((data) => {
      // console.log('----------answer-----------------');
      this.onAnswer(data);
      // console.log(data);
    });
  }
  // ----------------- handshake --------------
  fire() {
    // this.signllingService.connect("http://127.0.0.1:3000");
    // this.signllingService.onEmit("offer", "Anh chao may");
    // const successHandle = this.handleSuccess.bind(this);
    // const handlError = this.handleError;
    // this.handleCamera(successHandle, handlError);

    this.onCall();
  }

  initWebrtcConnection() {
    this.peerConnection = new RTCPeerConnection(this.iceConfiguration);
    this.peerConnection.onicecandidate = e => {
      console.log('------------onicecandidate-----------');
      this.signllingService.publish("candidate", e.candidate);
      console.log(e);
    };
    this.peerConnection.onicecandidateerror = e => {
      // console.log('------------onicecandidateerror-----------');
      // console.log(e);
    }

    this.peerConnection.oniceconnectionstatechange = e => {
      // console.log('--------------oniceconnectionstatechange-------------');
      // console.log(e);
    }
    // this.peerConnection.o
    this.peerConnection.onicegatheringstatechange = e => console.log("onicegatheringstatechange");
    this.peerConnection.onnegotiationneeded = e => console.log("onnegotiationneeded");
    this.peerConnection.onsignalingstatechange = e =>  {
      // console.log("onsignalingstatechange");
      // console.log(this.peerConnection.signalingState);
    }
    // this.peerConnection.on
    this.peerConnection.onconnectionstatechange = e => {
      // console.log('--------connection --------------');
      // console.log(this.peerConnection.connectionState);
    }
    this.peerConnection.ontrack = e => {
      this.remoteVideo = e.streams[0];
      // console.log(e);
      this.remoteVideoRef.nativeElement.srcObject = this.remoteVideo;
    }
  }

  initOffer() {
    this.peerConnection.createOffer().then(offer => {
      this.peerConnection.setLocalDescription(offer);
      this.signllingService.publish('offer', offer);
   
    }).catch(e => console.log(e));
  }

  answerHandle(evt: any) {

  }

  candidateHandle(evt: any) {
    // var candidate = new RTCIceCandidate({ sdpMLineIndex: evt.sdpMLineIndex, sdpMid: evt.sdpMid, candidate: evt.candidate });
   
    // this.peerConnection.addIceCandidate(candidate);
  }

  // ---------------------- emit socket---------------------------
  handleSingnal(evt: CallEvent, data: any) {
    switch (evt) {

    }
    this.WebsocketService.emit(evt, data);
  }

  onCandidate(candidate : any) {
      this.peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
  }
  onAnswer(answer : any) {
    console.log('---------------answer----------------');
    this.peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
    // console.log(this.peerConnection);
    console.log(this.peerConnection.signalingState);
  }

  //when somebody wants to call us
  onOffer(offer : any) {
    this.initWebrtcConnection();
    this.handleCamera( (x)=> {
      const videoTracks = x.getVideoTracks();
      this.localVideo = x;
      this.peerConnection.addTrack(videoTracks[0], x);
      this.localVideoRef.nativeElement.srcObject = this.localVideo;

      this.peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
      this.peerConnection.createAnswer().then((answer) => {
        this.peerConnection.setLocalDescription(answer).then(x => {this.signllingService.publish("answer", answer);});
      });
      
    }, (err) => console.log(err));
   
    // console.log(offer);
  }

  onCall() {
    // this.initWebrtcConnection();
    // this.initOffer();
    const handleSuccess = this.handleSuccess.bind(this);
    const handleError =  this.handleError.bind(this);
    this.handleCamera(handleSuccess, handleError);
  }
 
  handleICECandidateEvent(data : any) {
    console.log('---------------ice----------------');
    console.log(data);
  }
  // ---------------------- video handling -----------------------
  // getConnectedDevices(type : any) {
  //  const devices = navigator.mediaDevices.enumerateDevices();
  //   return (devices instanceof Array) ? devices.filter(device => device.kind === type) : devices; 
  // }

  openCamera(constraints : any) {
    // DainV
    // navigator.permissions.query({name: 'microphone'})
    // .then((permissionObj) => {
    //   console.log(permissionObj.state);
    // })
    // .catch((error) => {
    //   console.log('Got error :', error);
    // })

    // navigator.permissions.query({name: 'camera'})
    // .then((permissionObj) => {
    //   console.log(permissionObj.state);
    // })
    // .catch((error) => {
    //   console.log('Got error :', error);
    // })
    // ENd DaiNV

    return navigator.mediaDevices.getUserMedia(constraints);
  }

  handleCamera(successHandle: any, errorHandle: any) {
    if (adapter.browserDetails.browser == 'chrome') {
      adapter.browserShim.shimGetDisplayMedia(window, 'screen');
    }
    var constraints = {
      audio: true,
      video: true,
    };
    this.openCamera(constraints).then(x => successHandle(x)).catch(err => errorHandle(err));
  }

  handleSuccess(camera: any) {
    this.initWebrtcConnection();
    const videoTracks = camera.getVideoTracks();
    this.localVideo = camera;
    this.peerConnection.addTrack(videoTracks[0], camera);
    this.initOffer();
    this.localVideoRef.nativeElement.srcObject = this.localVideo;
    // camera.getVideoTracks()[0].addEventListener('ended', () => {
    //   console.log('The user has ended sharing the screen');
    // });
    this.localVideoRef.nativeElement.play();
  }
  // ---------------------- Error handling -----------------------
  handleError(err: any) {
    console.log(err);
  }
  // ---------------------- connection handling -----------------------
}
