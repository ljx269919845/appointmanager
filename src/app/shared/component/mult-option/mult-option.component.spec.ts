import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultOptionComponent } from './mult-option.component';

describe('MultOptionComponent', () => {
  let component: MultOptionComponent;
  let fixture: ComponentFixture<MultOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
