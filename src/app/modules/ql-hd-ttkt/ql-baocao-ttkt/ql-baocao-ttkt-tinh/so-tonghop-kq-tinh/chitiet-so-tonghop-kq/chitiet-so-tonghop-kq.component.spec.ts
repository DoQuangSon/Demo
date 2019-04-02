import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChitietSoTonghopKqComponent } from './chitiet-so-tonghop-kq.component';

describe('ChitietSoTonghopKqComponent', () => {
  let component: ChitietSoTonghopKqComponent;
  let fixture: ComponentFixture<ChitietSoTonghopKqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChitietSoTonghopKqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChitietSoTonghopKqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
