import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartEndCalendarComponent } from './start-end-calendar.component';

describe('StartEndCalendarComponent', () => {
  let component: StartEndCalendarComponent;
  let fixture: ComponentFixture<StartEndCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartEndCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartEndCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
