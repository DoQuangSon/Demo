import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhmucPhongBanComponent } from './danhmuc-phong-ban.component';

describe('DanhmucPhongBanComponent', () => {
  let component: DanhmucPhongBanComponent;
  let fixture: ComponentFixture<DanhmucPhongBanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhmucPhongBanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhmucPhongBanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
