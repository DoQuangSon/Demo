import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChitietHdDonviTwComponent } from './chitiet-hd-donvi-tw.component';

describe('ChitietHdDonviTwComponent', () => {
  let component: ChitietHdDonviTwComponent;
  let fixture: ComponentFixture<ChitietHdDonviTwComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChitietHdDonviTwComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChitietHdDonviTwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
