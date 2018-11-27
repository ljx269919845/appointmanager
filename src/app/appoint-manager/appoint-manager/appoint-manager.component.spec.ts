import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointManagerComponent } from './appoint-manager.component';

describe('AppointManagerComponent', () => {
  let component: AppointManagerComponent;
  let fixture: ComponentFixture<AppointManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
