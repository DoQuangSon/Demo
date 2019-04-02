import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateKHBHXHTinhComponent } from './create-kh-bhxh-tinh.component';

describe('CreateKhBhxhTinhComponent', () => {
  let component: CreateKHBHXHTinhComponent;
  let fixture: ComponentFixture<CreateKHBHXHTinhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateKHBHXHTinhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateKHBHXHTinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
