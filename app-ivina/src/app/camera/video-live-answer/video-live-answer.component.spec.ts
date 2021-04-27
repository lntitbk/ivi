import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoLiveAnswerComponent } from './video-live-answer.component';

describe('VideoLiveAnswerComponent', () => {
  let component: VideoLiveAnswerComponent;
  let fixture: ComponentFixture<VideoLiveAnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoLiveAnswerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoLiveAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
