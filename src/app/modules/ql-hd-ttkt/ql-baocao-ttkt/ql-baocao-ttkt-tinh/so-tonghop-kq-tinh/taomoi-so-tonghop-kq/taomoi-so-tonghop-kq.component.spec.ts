import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaomoiSoTonghopKqComponent } from './taomoi-so-tonghop-kq.component';

describe('TaomoiSoTonghopKqComponent', () => {
  let component: TaomoiSoTonghopKqComponent;
  let fixture: ComponentFixture<TaomoiSoTonghopKqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaomoiSoTonghopKqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaomoiSoTonghopKqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
