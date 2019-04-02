import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaomoiBcTonghopKqComponent } from './taomoi-bc-tonghop-kq.component';

describe('TaomoiBcTonghopKqComponent', () => {
  let component: TaomoiBcTonghopKqComponent;
  let fixture: ComponentFixture<TaomoiBcTonghopKqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaomoiBcTonghopKqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaomoiBcTonghopKqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
