import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DsSoTheodoiDonviTwComponent } from './ds-so-theodoi-donvi-tw.component';

describe('DsSoTheodoiDonviTwComponent', () => {
  let component: DsSoTheodoiDonviTwComponent;
  let fixture: ComponentFixture<DsSoTheodoiDonviTwComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DsSoTheodoiDonviTwComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DsSoTheodoiDonviTwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
