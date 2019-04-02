import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhmucTinhhuyenComponent } from './danhmuc-tinhhuyen.component';

describe('DanhmucTinhhuyenComponent', () => {
  let component: DanhmucTinhhuyenComponent;
  let fixture: ComponentFixture<DanhmucTinhhuyenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhmucTinhhuyenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhmucTinhhuyenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
