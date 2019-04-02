import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoTonghopKqTinhComponent } from './so-tonghop-kq-tinh.component';

describe('SoTonghopKqTinhComponent', () => {
  let component: SoTonghopKqTinhComponent;
  let fixture: ComponentFixture<SoTonghopKqTinhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoTonghopKqTinhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoTonghopKqTinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
