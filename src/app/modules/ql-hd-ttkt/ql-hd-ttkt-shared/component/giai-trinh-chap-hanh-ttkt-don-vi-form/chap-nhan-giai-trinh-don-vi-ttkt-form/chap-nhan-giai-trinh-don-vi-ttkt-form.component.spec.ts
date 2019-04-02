import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapNhanGiaiTrinhDonViTtktFormComponent } from './chap-nhan-giai-trinh-don-vi-ttkt-form.component';

describe('ChapNhanGiaiTrinhDonViTtktFormComponent', () => {
  let component: ChapNhanGiaiTrinhDonViTtktFormComponent;
  let fixture: ComponentFixture<ChapNhanGiaiTrinhDonViTtktFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChapNhanGiaiTrinhDonViTtktFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChapNhanGiaiTrinhDonViTtktFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
