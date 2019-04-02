import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapNhatKHBHXHTinhComponent } from './capnhat-kh-bhxh-tinh.component';

describe('CapNhatKHBHXHTinhComponent', () => {
  let component: CapNhatKHBHXHTinhComponent;
  let fixture: ComponentFixture<CapNhatKHBHXHTinhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapNhatKHBHXHTinhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapNhatKHBHXHTinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
