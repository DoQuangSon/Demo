import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhSachTinhFormComponent } from './danh-sach-tinh-form.component';

describe('DanhSachTinhFormComponent', () => {
  let component: DanhSachTinhFormComponent;
  let fixture: ComponentFixture<DanhSachTinhFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhSachTinhFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhSachTinhFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
