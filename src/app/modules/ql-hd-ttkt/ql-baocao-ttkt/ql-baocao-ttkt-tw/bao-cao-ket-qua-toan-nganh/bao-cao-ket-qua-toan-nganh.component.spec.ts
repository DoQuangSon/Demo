import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaoCaoKetQuaToanNganhComponent } from './bao-cao-ket-qua-toan-nganh.component';

describe('BaoCaoKetQuaToanNganhComponent', () => {
  let component: BaoCaoKetQuaToanNganhComponent;
  let fixture: ComponentFixture<BaoCaoKetQuaToanNganhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaoCaoKetQuaToanNganhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaoCaoKetQuaToanNganhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
