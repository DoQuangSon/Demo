import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpPrintMau05Component } from './pop-up-print-mau05.component';

describe('PopUpPrintMau05Component', () => {
  let component: PopUpPrintMau05Component;
  let fixture: ComponentFixture<PopUpPrintMau05Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopUpPrintMau05Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpPrintMau05Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
