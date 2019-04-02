import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DsSoTheodoiDonviComponent } from './ds-so-theodoi-donvi.component';

describe('DsSoTheodoiDonviComponent', () => {
  let component: DsSoTheodoiDonviComponent;
  let fixture: ComponentFixture<DsSoTheodoiDonviComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DsSoTheodoiDonviComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DsSoTheodoiDonviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
