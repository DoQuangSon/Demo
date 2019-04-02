import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTypeSelectOptionComponent } from './input-type-select-option.component';

describe('InputTypeSelectOptionComponent', () => {
  let component: InputTypeSelectOptionComponent;
  let fixture: ComponentFixture<InputTypeSelectOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputTypeSelectOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputTypeSelectOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
