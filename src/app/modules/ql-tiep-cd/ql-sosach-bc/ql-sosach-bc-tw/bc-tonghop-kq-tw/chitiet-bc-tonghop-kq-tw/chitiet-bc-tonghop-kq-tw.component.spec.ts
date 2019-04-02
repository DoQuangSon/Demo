import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChitietBcTonghopKqTwComponent } from './chitiet-bc-tonghop-kq-tw.component';

describe('ChitietBcTonghopKqTwComponent', () => {
  let component: ChitietBcTonghopKqTwComponent;
  let fixture: ComponentFixture<ChitietBcTonghopKqTwComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChitietBcTonghopKqTwComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChitietBcTonghopKqTwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
