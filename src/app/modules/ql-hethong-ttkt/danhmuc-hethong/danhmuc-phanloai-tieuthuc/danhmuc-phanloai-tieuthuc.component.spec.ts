import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhmucPhanloaiTieuthucComponent } from './danhmuc-phanloai-tieuthuc.component';

describe('DanhmucPhanloaiTieuthucComponent', () => {
  let component: DanhmucPhanloaiTieuthucComponent;
  let fixture: ComponentFixture<DanhmucPhanloaiTieuthucComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhmucPhanloaiTieuthucComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhmucPhanloaiTieuthucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
