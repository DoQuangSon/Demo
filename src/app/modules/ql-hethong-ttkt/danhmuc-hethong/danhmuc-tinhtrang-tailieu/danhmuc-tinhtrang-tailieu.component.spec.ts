import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhmucTinhtrangTailieuComponent } from './danhmuc-tinhtrang-tailieu.component';

describe('DanhmucTinhtrangTailieuComponent', () => {
  let component: DanhmucTinhtrangTailieuComponent;
  let fixture: ComponentFixture<DanhmucTinhtrangTailieuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhmucTinhtrangTailieuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhmucTinhtrangTailieuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
