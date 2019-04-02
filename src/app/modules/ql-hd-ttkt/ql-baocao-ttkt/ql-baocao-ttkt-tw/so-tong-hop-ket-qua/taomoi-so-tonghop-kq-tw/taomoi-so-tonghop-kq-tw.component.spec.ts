import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaomoiSoTonghopKqTwComponent } from './taomoi-so-tonghop-kq-tw.component';

describe('TaomoiSoTonghopKqTwComponent', () => {
  let component: TaomoiSoTonghopKqTwComponent;
  let fixture: ComponentFixture<TaomoiSoTonghopKqTwComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaomoiSoTonghopKqTwComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaomoiSoTonghopKqTwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
