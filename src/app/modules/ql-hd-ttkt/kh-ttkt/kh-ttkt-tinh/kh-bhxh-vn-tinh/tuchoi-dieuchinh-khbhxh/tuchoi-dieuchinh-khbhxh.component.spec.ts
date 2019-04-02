import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TuchoiDieuchinhKhbhxhComponent } from './tuchoi-dieuchinh-khbhxh.component';

describe('TuchoiDieuchinhKhbhxhComponent', () => {
  let component: TuchoiDieuchinhKhbhxhComponent;
  let fixture: ComponentFixture<TuchoiDieuchinhKhbhxhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TuchoiDieuchinhKhbhxhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TuchoiDieuchinhKhbhxhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
