import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhSachTinhComponent } from './danh-sach-tinh.component';

describe('DanhSachTinhComponent', () => {
  let component: DanhSachTinhComponent;
  let fixture: ComponentFixture<DanhSachTinhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhSachTinhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhSachTinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
