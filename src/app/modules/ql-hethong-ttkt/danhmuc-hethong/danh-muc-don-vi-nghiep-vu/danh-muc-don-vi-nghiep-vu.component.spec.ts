import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhMucDonViNghiepVuComponent } from './danh-muc-don-vi-nghiep-vu.component';

describe('DanhMucDonViNghiepVuComponent', () => {
  let component: DanhMucDonViNghiepVuComponent;
  let fixture: ComponentFixture<DanhMucDonViNghiepVuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhMucDonViNghiepVuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhMucDonViNghiepVuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
