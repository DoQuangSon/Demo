import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChitietHdDonviTinhComponent } from './chitiet-hd-donvi-tinh.component';

describe('ChitietHdDonviTinhComponent', () => {
  let component: ChitietHdDonviTinhComponent;
  let fixture: ComponentFixture<ChitietHdDonviTinhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChitietHdDonviTinhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChitietHdDonviTinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
