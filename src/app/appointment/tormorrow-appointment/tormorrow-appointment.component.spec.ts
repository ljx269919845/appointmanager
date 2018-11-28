import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TormorrowAppointmentComponent } from './tormorrow-appointment.component';

describe('TormorrowAppointmentComponent', () => {
  let component: TormorrowAppointmentComponent;
  let fixture: ComponentFixture<TormorrowAppointmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TormorrowAppointmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TormorrowAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
