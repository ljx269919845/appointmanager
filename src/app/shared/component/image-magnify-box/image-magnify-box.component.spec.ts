import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageMagnifyBoxComponent } from './image-magnify-box.component';

describe('ImageMagnifyBoxComponent', () => {
  let component: ImageMagnifyBoxComponent;
  let fixture: ComponentFixture<ImageMagnifyBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageMagnifyBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageMagnifyBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
