import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointSetComponent } from './appoint-set.component';

describe('AppointSetComponent', () => {
  let component: AppointSetComponent;
  let fixture: ComponentFixture<AppointSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
