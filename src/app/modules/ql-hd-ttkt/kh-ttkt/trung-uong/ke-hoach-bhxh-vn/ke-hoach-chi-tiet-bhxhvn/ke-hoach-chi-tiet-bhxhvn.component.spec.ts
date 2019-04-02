import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeHoachChiTietBhxhvnComponent } from './ke-hoach-chi-tiet-bhxhvn.component';

describe('KeHoachChiTietBhxhvnComponent', () => {
  let component: KeHoachChiTietBhxhvnComponent;
  let fixture: ComponentFixture<KeHoachChiTietBhxhvnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeHoachChiTietBhxhvnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeHoachChiTietBhxhvnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
