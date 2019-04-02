import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiaoKeHoachChoCacTinhComponent } from './giao-ke-hoach-cho-cac-tinh.component';

describe('GiaoKeHoachChoCacTinhComponent', () => {
  let component: GiaoKeHoachChoCacTinhComponent;
  let fixture: ComponentFixture<GiaoKeHoachChoCacTinhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiaoKeHoachChoCacTinhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiaoKeHoachChoCacTinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
