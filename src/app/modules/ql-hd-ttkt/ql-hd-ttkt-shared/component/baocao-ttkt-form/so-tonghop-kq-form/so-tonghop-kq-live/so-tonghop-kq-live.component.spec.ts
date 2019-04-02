import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoTonghopKqLiveComponent } from './so-tonghop-kq-live.component';

describe('SoTonghopKqLiveComponent', () => {
  let component: SoTonghopKqLiveComponent;
  let fixture: ComponentFixture<SoTonghopKqLiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoTonghopKqLiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoTonghopKqLiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
