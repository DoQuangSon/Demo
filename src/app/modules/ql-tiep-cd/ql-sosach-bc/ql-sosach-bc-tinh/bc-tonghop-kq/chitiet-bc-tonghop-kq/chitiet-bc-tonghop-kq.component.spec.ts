import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChitietBcTonghopKqComponent } from './chitiet-bc-tonghop-kq.component';

describe('ChitietBcTonghopKqComponent', () => {
  let component: ChitietBcTonghopKqComponent;
  let fixture: ComponentFixture<ChitietBcTonghopKqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChitietBcTonghopKqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChitietBcTonghopKqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
