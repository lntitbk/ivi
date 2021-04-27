import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoLiveOfferComponent } from './video-live-offer.component';

describe('VideoLiveOfferComponent', () => {
  let component: VideoLiveOfferComponent;
  let fixture: ComponentFixture<VideoLiveOfferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoLiveOfferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoLiveOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
