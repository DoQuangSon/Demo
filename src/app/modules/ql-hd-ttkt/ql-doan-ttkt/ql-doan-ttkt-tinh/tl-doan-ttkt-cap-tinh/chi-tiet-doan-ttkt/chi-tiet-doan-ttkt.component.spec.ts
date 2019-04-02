import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiTietDoanTtktComponent } from './chi-tiet-doan-ttkt.component';

describe('ChiTietDoanTtktComponent', () => {
  let component: ChiTietDoanTtktComponent;
  let fixture: ComponentFixture<ChiTietDoanTtktComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChiTietDoanTtktComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiTietDoanTtktComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
