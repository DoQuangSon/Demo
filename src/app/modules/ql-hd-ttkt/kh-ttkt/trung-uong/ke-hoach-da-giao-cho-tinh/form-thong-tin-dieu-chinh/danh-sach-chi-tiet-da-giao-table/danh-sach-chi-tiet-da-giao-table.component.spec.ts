import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhSachChiTietDaGiaoTableComponent } from './danh-sach-chi-tiet-da-giao-table.component';

describe('DanhSachChiTietDaGiaoTableComponent', () => {
  let component: DanhSachChiTietDaGiaoTableComponent;
  let fixture: ComponentFixture<DanhSachChiTietDaGiaoTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhSachChiTietDaGiaoTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhSachChiTietDaGiaoTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
