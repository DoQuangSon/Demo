import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiTietDoanTtktTwComponent } from './chi-tiet-doan-ttkt-tw.component';

describe('ChiTietDoanTtktTwComponent', () => {
  let component: ChiTietDoanTtktTwComponent;
  let fixture: ComponentFixture<ChiTietDoanTtktTwComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChiTietDoanTtktTwComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiTietDoanTtktTwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
