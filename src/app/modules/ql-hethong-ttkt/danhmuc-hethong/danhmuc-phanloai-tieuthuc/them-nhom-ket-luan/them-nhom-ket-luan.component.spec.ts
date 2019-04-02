import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemNhomKetLuanComponent } from './them-nhom-ket-luan.component';

describe('ThemNhomKetLuanComponent', () => {
  let component: ThemNhomKetLuanComponent;
  let fixture: ComponentFixture<ThemNhomKetLuanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemNhomKetLuanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemNhomKetLuanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
