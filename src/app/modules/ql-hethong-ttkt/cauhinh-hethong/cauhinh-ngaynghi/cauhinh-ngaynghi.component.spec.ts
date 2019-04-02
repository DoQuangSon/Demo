import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CauHinhNgayNghiComponent } from './cauhinh-ngaynghi.component';

describe('CauHinhNgayNghiComponent', () => {
  let component: CauHinhNgayNghiComponent;
  let fixture: ComponentFixture<CauHinhNgayNghiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CauHinhNgayNghiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CauHinhNgayNghiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
