import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiaiTrinhChapHanhTtktDonViTwComponent } from './giai-trinh-chap-hanh-ttkt-don-vi-tw.component';

describe('GiaiTrinhChapHanhTtktDonViTwComponent', () => {
  let component: GiaiTrinhChapHanhTtktDonViTwComponent;
  let fixture: ComponentFixture<GiaiTrinhChapHanhTtktDonViTwComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiaiTrinhChapHanhTtktDonViTwComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiaiTrinhChapHanhTtktDonViTwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
