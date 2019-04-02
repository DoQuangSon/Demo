import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XayDungKeHoachTrungUongComponent } from './xay-dung-ke-hoach-trung-uong.component';

describe('XayDungKeHoachTrungUongComponent', () => {
  let component: XayDungKeHoachTrungUongComponent;
  let fixture: ComponentFixture<XayDungKeHoachTrungUongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XayDungKeHoachTrungUongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XayDungKeHoachTrungUongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
