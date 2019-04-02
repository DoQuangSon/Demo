import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BcTonghopKqComponent } from './bc-tonghop-kq.component';

describe('BcTonghopKqComponent', () => {
  let component: BcTonghopKqComponent;
  let fixture: ComponentFixture<BcTonghopKqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BcTonghopKqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BcTonghopKqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
