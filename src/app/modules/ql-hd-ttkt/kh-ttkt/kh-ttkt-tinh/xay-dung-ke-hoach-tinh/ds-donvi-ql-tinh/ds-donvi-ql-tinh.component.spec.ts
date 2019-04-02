import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DsDonviQlTinhComponent } from './ds-donvi-ql-tinh.component';

describe('DsDonviQlTinhComponent', () => {
  let component: DsDonviQlTinhComponent;
  let fixture: ComponentFixture<DsDonviQlTinhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DsDonviQlTinhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DsDonviQlTinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
