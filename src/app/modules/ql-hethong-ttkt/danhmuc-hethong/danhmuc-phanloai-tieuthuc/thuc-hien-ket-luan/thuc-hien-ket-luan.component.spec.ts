import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThucHienKetLuanComponent } from './thuc-hien-ket-luan.component';

describe('ThucHienKetLuanComponent', () => {
  let component: ThucHienKetLuanComponent;
  let fixture: ComponentFixture<ThucHienKetLuanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThucHienKetLuanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThucHienKetLuanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
