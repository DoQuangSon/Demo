import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaoCaoTongHopToanNganhComponent } from './bao-cao-tong-hop-toan-nganh.component';

describe('BaoCaoTongHopToanNganhComponent', () => {
  let component: BaoCaoTongHopToanNganhComponent;
  let fixture: ComponentFixture<BaoCaoTongHopToanNganhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaoCaoTongHopToanNganhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaoCaoTongHopToanNganhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
