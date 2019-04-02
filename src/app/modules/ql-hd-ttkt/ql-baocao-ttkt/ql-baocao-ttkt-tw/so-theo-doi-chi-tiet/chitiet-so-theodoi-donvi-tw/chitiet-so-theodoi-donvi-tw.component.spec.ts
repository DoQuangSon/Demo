import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChitietSoTheodoiDonviTwComponent } from './chitiet-so-theodoi-donvi-tw.component';

describe('ChitietSoTheodoiDonviTwComponent', () => {
  let component: ChitietSoTheodoiDonviTwComponent;
  let fixture: ComponentFixture<ChitietSoTheodoiDonviTwComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChitietSoTheodoiDonviTwComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChitietSoTheodoiDonviTwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
