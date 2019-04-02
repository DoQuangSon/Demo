import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TheodoiHdDoanTtktTwComponent } from './theodoi-hd-doan-ttkt-tw.component';

describe('TheodoiHdDoanTtktTwComponent', () => {
  let component: TheodoiHdDoanTtktTwComponent;
  let fixture: ComponentFixture<TheodoiHdDoanTtktTwComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TheodoiHdDoanTtktTwComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TheodoiHdDoanTtktTwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
