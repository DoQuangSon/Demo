import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiaiTrinhChapHanhTtktDonViFormComponent } from './giai-trinh-chap-hanh-ttkt-don-vi-form.component';

describe('GiaiTrinhChapHanhTtktDonViFormComponent', () => {
  let component: GiaiTrinhChapHanhTtktDonViFormComponent;
  let fixture: ComponentFixture<GiaiTrinhChapHanhTtktDonViFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiaiTrinhChapHanhTtktDonViFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiaiTrinhChapHanhTtktDonViFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
