import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThongTinDieuChinhComponent } from './thong-tin-dieu-chinh.component';

describe('ThongTinDieuChinhComponent', () => {
  let component: ThongTinDieuChinhComponent;
  let fixture: ComponentFixture<ThongTinDieuChinhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThongTinDieuChinhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThongTinDieuChinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
