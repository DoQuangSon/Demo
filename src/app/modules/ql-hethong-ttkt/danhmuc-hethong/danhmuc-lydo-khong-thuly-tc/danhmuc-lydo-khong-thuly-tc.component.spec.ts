import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhmucLyDoKhongThuLyTcComponent } from './danhmuc-lydo-khong-thuly-tc.component';

describe('DanhmucLyDoKhongThuLyTcComponent', () => {
  let component: DanhmucLyDoKhongThuLyTcComponent;
  let fixture: ComponentFixture<DanhmucLyDoKhongThuLyTcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhmucLyDoKhongThuLyTcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhmucLyDoKhongThuLyTcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
