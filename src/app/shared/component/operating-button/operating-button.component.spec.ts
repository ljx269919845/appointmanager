import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatingButtonComponent } from './operating-button.component';

describe('OperatingButtonComponent', () => {
  let component: OperatingButtonComponent;
  let fixture: ComponentFixture<OperatingButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperatingButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatingButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
