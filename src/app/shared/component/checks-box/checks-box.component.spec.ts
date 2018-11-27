import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecksBoxComponent } from './checks-box.component';

describe('ChecksBoxComponent', () => {
  let component: ChecksBoxComponent;
  let fixture: ComponentFixture<ChecksBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChecksBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecksBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
