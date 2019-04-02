import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhmucChitietNoidungComponent } from './danhmuc-chitiet-noidung.component';

describe('DanhmucChitietNoidungComponent', () => {
  let component: DanhmucChitietNoidungComponent;
  let fixture: ComponentFixture<DanhmucChitietNoidungComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhmucChitietNoidungComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhmucChitietNoidungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
