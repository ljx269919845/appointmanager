import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagingBoxChildrenComponent } from './paging-box-children.component';

describe('PagingBoxChildrenComponent', () => {
  let component: PagingBoxChildrenComponent;
  let fixture: ComponentFixture<PagingBoxChildrenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagingBoxChildrenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagingBoxChildrenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
