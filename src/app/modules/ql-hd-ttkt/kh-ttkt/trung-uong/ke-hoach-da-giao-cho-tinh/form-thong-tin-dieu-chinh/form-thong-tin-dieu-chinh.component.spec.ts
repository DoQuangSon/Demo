import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormThongTinDieuChinhComponent } from './form-thong-tin-dieu-chinh.component';

describe('FormThongTinDieuChinhComponent', () => {
  let component: FormThongTinDieuChinhComponent;
  let fixture: ComponentFixture<FormThongTinDieuChinhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormThongTinDieuChinhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormThongTinDieuChinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
