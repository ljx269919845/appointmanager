import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagingBoxComponent } from './paging-box.component';

describe('PagingBoxComponent', () => {
  let component: PagingBoxComponent;
  let fixture: ComponentFixture<PagingBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagingBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagingBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
