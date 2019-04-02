import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeHoachXinDieuChinhDuocChapNhanComponent } from './ke-hoach-xin-dieu-chinh-duoc-chap-nhan.component';

describe('KeHoachXinDieuChinhDuocChapNhanComponent', () => {
  let component: KeHoachXinDieuChinhDuocChapNhanComponent;
  let fixture: ComponentFixture<KeHoachXinDieuChinhDuocChapNhanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeHoachXinDieuChinhDuocChapNhanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeHoachXinDieuChinhDuocChapNhanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
