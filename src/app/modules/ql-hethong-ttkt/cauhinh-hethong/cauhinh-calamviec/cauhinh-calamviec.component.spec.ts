import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CauHinhCaLamViecComponent } from './cauhinh-calamviec.component';

describe('CauHinhCaLamViecComponent', () => {
  let component: CauHinhCaLamViecComponent;
  let fixture: ComponentFixture<CauHinhCaLamViecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CauHinhCaLamViecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CauHinhCaLamViecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
