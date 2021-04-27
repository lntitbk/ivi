import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageLiveComponent } from './image-live.component';

describe('ImageLiveComponent', () => {
  let component: ImageLiveComponent;
  let fixture: ComponentFixture<ImageLiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageLiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageLiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
