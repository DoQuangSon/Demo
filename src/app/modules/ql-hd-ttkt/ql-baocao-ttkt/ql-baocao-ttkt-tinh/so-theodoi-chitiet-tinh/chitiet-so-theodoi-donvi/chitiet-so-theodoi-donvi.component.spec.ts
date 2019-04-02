import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChitietSoTheodoiDonviComponent } from './chitiet-so-theodoi-donvi.component';

describe('ChitietSoTheodoiDonviComponent', () => {
  let component: ChitietSoTheodoiDonviComponent;
  let fixture: ComponentFixture<ChitietSoTheodoiDonviComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChitietSoTheodoiDonviComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChitietSoTheodoiDonviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
