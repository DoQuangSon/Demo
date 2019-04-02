import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DsSoTheodoiDonviFormComponent } from './ds-so-theodoi-donvi-form.component';

describe('DsSoTheodoiDonviFormComponent', () => {
  let component: DsSoTheodoiDonviFormComponent;
  let fixture: ComponentFixture<DsSoTheodoiDonviFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DsSoTheodoiDonviFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DsSoTheodoiDonviFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
