import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DsDonviQlComponent } from './ds-donvi-ql.component';

describe('DsDonviQlComponent', () => {
  let component: DsDonviQlComponent;
  let fixture: ComponentFixture<DsDonviQlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DsDonviQlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DsDonviQlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
