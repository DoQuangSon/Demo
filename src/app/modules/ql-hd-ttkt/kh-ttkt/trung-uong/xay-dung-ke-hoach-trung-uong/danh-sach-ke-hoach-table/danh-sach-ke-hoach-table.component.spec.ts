import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhSachKeHoachTableComponent } from './danh-sach-ke-hoach-table.component';

describe('DanhSachKeHoachTableComponent', () => {
  let component: DanhSachKeHoachTableComponent;
  let fixture: ComponentFixture<DanhSachKeHoachTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhSachKeHoachTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhSachKeHoachTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
