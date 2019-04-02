import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TlDoanTtktCapTinhComponent } from './tl-doan-ttkt-cap-tinh.component';

describe('TlDoanTtktCapTinhComponent', () => {
  let component: TlDoanTtktCapTinhComponent;
  let fixture: ComponentFixture<TlDoanTtktCapTinhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TlDoanTtktCapTinhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TlDoanTtktCapTinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
