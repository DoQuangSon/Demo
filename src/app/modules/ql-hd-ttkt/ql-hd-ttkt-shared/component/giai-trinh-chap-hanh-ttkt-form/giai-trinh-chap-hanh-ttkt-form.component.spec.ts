import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiaiTrinhChapHanhTtktFormComponent } from './giai-trinh-chap-hanh-ttkt-form.component';

describe('GiaiTrinhChapHanhTtktFormComponent', () => {
  let component: GiaiTrinhChapHanhTtktFormComponent;
  let fixture: ComponentFixture<GiaiTrinhChapHanhTtktFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiaiTrinhChapHanhTtktFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiaiTrinhChapHanhTtktFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
