import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultOptionsComponent } from './mult-options.component';

describe('MultOptionsComponent', () => {
  let component: MultOptionsComponent;
  let fixture: ComponentFixture<MultOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
