import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhsachDtComponent } from './danhsach-dt.component';

describe('DanhsachDtComponent', () => {
  let component: DanhsachDtComponent;
  let fixture: ComponentFixture<DanhsachDtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhsachDtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhsachDtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
