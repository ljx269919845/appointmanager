import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromptsBoxComponent } from './prompts-box.component';

describe('PromptsBoxComponent', () => {
  let component: PromptsBoxComponent;
  let fixture: ComponentFixture<PromptsBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromptsBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromptsBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
