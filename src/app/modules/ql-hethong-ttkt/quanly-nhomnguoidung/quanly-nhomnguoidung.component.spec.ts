import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanlyNhomnguoidungComponent } from './quanly-nhomnguoidung.component';

describe('QuanlyNhomnguoidungComponent', () => {
  let component: QuanlyNhomnguoidungComponent;
  let fixture: ComponentFixture<QuanlyNhomnguoidungComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuanlyNhomnguoidungComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuanlyNhomnguoidungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
