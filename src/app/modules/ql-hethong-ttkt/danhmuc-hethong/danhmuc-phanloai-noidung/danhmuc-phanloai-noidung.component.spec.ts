import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhmucPhanloaiNoidungComponent } from './danhmuc-phanloai-noidung.component';

describe('DanhmucPhanloaiNoidungComponent', () => {
  let component: DanhmucPhanloaiNoidungComponent;
  let fixture: ComponentFixture<DanhmucPhanloaiNoidungComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhmucPhanloaiNoidungComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhmucPhanloaiNoidungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
