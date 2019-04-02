import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CauHinhThamSoHeThongComponent } from './cauhinh-thamso-hethong.component';

describe('CauHinhThamSoHeThongComponent', () => {
  let component: CauHinhThamSoHeThongComponent;
  let fixture: ComponentFixture<CauHinhThamSoHeThongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CauHinhThamSoHeThongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CauHinhThamSoHeThongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
