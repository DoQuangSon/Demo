import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhSachSoTheodoiTTKTComponent } from './danhsach-sotheodoi-ttkt.component';

describe('TheodoiDondocTinhComponent', () => {
  let component: DanhSachSoTheodoiTTKTComponent;
  let fixture: ComponentFixture<DanhSachSoTheodoiTTKTComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhSachSoTheodoiTTKTComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhSachSoTheodoiTTKTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
