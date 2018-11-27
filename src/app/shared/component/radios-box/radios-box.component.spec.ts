import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadiosBoxComponent } from './radios-box.component';

describe('RadiosBoxComponent', () => {
  let component: RadiosBoxComponent;
  let fixture: ComponentFixture<RadiosBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RadiosBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadiosBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
