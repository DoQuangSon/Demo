import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailKHBHXHTinhComponent } from './detail-kh-bhxh-tinh.component';

describe('ChitietKhBhxhTinhComponent', () => {
  let component: DetailKHBHXHTinhComponent;
  let fixture: ComponentFixture<DetailKHBHXHTinhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailKHBHXHTinhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailKHBHXHTinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
