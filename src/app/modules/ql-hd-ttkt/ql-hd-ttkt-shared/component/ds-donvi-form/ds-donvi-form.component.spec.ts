import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DsDonviFormComponent } from './ds-donvi-form.component';

describe('DsDonviFormComponent', () => {
  let component: DsDonviFormComponent;
  let fixture: ComponentFixture<DsDonviFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DsDonviFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DsDonviFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
