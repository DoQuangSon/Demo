import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaomoiBcTonghopKqTwComponent } from './taomoi-bc-tonghop-kq-tw.component';

describe('TaomoiBcTonghopKqTwComponent', () => {
  let component: TaomoiBcTonghopKqTwComponent;
  let fixture: ComponentFixture<TaomoiBcTonghopKqTwComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaomoiBcTonghopKqTwComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaomoiBcTonghopKqTwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
