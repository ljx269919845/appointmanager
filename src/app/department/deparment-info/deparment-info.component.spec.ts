import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeparmentInfoComponent } from './deparment-info.component';

describe('DeparmentInfoComponent', () => {
  let component: DeparmentInfoComponent;
  let fixture: ComponentFixture<DeparmentInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeparmentInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeparmentInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
