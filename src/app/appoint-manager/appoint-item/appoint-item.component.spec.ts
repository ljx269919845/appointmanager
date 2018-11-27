import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointItemComponent } from './appoint-item.component';

describe('AppointItemComponent', () => {
  let component: AppointItemComponent;
  let fixture: ComponentFixture<AppointItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
