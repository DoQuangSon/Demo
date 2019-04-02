import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiaiTrinhChapHanhTtktTwComponent } from './giai-trinh-chap-hanh-ttkt-tw.component';

describe('GiaiTrinhChapHanhTtktTwComponent', () => {
  let component: GiaiTrinhChapHanhTtktTwComponent;
  let fixture: ComponentFixture<GiaiTrinhChapHanhTtktTwComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiaiTrinhChapHanhTtktTwComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiaiTrinhChapHanhTtktTwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
