import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhmucTuchoiTiepcdComponent } from './danhmuc-tuchoi-tiepcd.component';

describe('DanhmucTuchoiTiepcdComponent', () => {
  let component: DanhmucTuchoiTiepcdComponent;
  let fixture: ComponentFixture<DanhmucTuchoiTiepcdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhmucTuchoiTiepcdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhmucTuchoiTiepcdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
