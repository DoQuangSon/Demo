import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhmucNoidungTtktComponent } from './danhmuc-noidung-ttkt.component';

describe('DanhmucNoidungTtktComponent', () => {
  let component: DanhmucNoidungTtktComponent;
  let fixture: ComponentFixture<DanhmucNoidungTtktComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhmucNoidungTtktComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhmucNoidungTtktComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
