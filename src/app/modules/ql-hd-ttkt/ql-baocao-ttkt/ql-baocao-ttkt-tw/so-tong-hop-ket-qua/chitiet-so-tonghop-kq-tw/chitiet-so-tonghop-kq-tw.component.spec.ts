import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChitietSoTonghopKqTwComponent } from './chitiet-so-tonghop-kq-tw.component';

describe('ChitietSoTonghopKqTwComponent', () => {
  let component: ChitietSoTonghopKqTwComponent;
  let fixture: ComponentFixture<ChitietSoTonghopKqTwComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChitietSoTonghopKqTwComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChitietSoTonghopKqTwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
