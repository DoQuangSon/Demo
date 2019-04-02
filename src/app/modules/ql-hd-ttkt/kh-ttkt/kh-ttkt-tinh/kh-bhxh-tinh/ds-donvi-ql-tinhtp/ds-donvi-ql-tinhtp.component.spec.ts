import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DsDonviQlTinhtpComponent } from './ds-donvi-ql-tinhtp.component';

describe('DsDonviQlTinhtpComponent', () => {
  let component: DsDonviQlTinhtpComponent;
  let fixture: ComponentFixture<DsDonviQlTinhtpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DsDonviQlTinhtpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DsDonviQlTinhtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
