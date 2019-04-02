import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanlyNguoidungComponent } from './quanly-nguoidung.component';

describe('QuanlyNguoidungComponent', () => {
  let component: QuanlyNguoidungComponent;
  let fixture: ComponentFixture<QuanlyNguoidungComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuanlyNguoidungComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuanlyNguoidungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
