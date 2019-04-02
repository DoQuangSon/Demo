import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhmucChucdanhComponent } from './danhmuc-chucdanh.component';

describe('DanhmucChucdanhComponent', () => {
  let component: DanhmucChucdanhComponent;
  let fixture: ComponentFixture<DanhmucChucdanhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhmucChucdanhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhmucChucdanhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
