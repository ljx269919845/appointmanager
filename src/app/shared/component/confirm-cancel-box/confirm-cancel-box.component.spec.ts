import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmCancelBoxComponent } from './confirm-cancel-box.component';

describe('ConfirmCancelBoxComponent', () => {
  let component: ConfirmCancelBoxComponent;
  let fixture: ComponentFixture<ConfirmCancelBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmCancelBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmCancelBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
