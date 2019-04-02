import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TheodoiHdDoanTtktTinhComponent } from './theodoi-hd-doan-ttkt-tinh.component';

describe('TheodoiHdDoanTtktTinhComponent', () => {
  let component: TheodoiHdDoanTtktTinhComponent;
  let fixture: ComponentFixture<TheodoiHdDoanTtktTinhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TheodoiHdDoanTtktTinhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TheodoiHdDoanTtktTinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
