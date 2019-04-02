import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BcTonghopKqTwComponent } from './bc-tonghop-kq-tw.component';

describe('BcTonghopKqTwComponent', () => {
  let component: BcTonghopKqTwComponent;
  let fixture: ComponentFixture<BcTonghopKqTwComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BcTonghopKqTwComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BcTonghopKqTwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
