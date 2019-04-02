import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhmucPhanloaiDtComponent } from './danhmuc-phanloai-dt.component';

describe('DanhmucPhanloaiDtComponent', () => {
  let component: DanhmucPhanloaiDtComponent;
  let fixture: ComponentFixture<DanhmucPhanloaiDtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhmucPhanloaiDtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhmucPhanloaiDtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
