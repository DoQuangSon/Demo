import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BcTonghopTinhComponent } from './bc-tonghop-tinh.component';

describe('BcTonghopTinhComponent', () => {
  let component: BcTonghopTinhComponent;
  let fixture: ComponentFixture<BcTonghopTinhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BcTonghopTinhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BcTonghopTinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
