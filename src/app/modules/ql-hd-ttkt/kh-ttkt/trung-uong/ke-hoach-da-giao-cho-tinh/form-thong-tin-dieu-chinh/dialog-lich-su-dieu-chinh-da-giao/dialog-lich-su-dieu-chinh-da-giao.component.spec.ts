import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogLichSuDieuChinhDaGiaoComponent } from './dialog-lich-su-dieu-chinh-da-giao.component';

describe('DialogLichSuDieuChinhDaGiaoComponent', () => {
  let component: DialogLichSuDieuChinhDaGiaoComponent;
  let fixture: ComponentFixture<DialogLichSuDieuChinhDaGiaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogLichSuDieuChinhDaGiaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogLichSuDieuChinhDaGiaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
