import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiTietQDCongBoComponent } from './chitiet-qd-congbo.component';

describe('ChiTietQDCongBoComponent', () => {
  let component: ChiTietQDCongBoComponent;
  let fixture: ComponentFixture<ChiTietQDCongBoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChiTietQDCongBoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiTietQDCongBoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
