import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XayDungKeHoachTinhComponent } from './xay-dung-ke-hoach-tinh.component';

describe('XayDungKeHoachTinhComponent', () => {
  let component: XayDungKeHoachTinhComponent;
  let fixture: ComponentFixture<XayDungKeHoachTinhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XayDungKeHoachTinhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XayDungKeHoachTinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
