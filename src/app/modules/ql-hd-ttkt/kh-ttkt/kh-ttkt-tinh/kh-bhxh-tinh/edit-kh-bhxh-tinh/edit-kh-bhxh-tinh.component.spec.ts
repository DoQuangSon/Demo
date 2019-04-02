import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditKHBHXHTinhComponent } from './edit-kh-bhxh-tinh.component';

describe('EditKhBhxhTinhComponent', () => {
  let component: EditKHBHXHTinhComponent;
  let fixture: ComponentFixture<EditKHBHXHTinhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditKHBHXHTinhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditKHBHXHTinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
