import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpPrintComponent } from './pop-up-print.component';

describe('PopUpPrintComponent', () => {
  let component: PopUpPrintComponent;
  let fixture: ComponentFixture<PopUpPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopUpPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
