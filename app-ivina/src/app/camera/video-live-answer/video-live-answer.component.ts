import { Component, OnInit } from '@angular/core';
import { SignallingService } from 'src/app/shared/service/signalling.service';

@Component({
  selector: 'app-video-live-answer',
  templateUrl: './video-live-answer.component.html',
  styleUrls: ['./video-live-answer.component.css']
})
export class VideoLiveAnswerComponent implements OnInit {
  private peerConnection: RTCPeerConnection;

  constructor(private signllingService: SignallingService) { }

  ngOnInit(): void {
  }

}
