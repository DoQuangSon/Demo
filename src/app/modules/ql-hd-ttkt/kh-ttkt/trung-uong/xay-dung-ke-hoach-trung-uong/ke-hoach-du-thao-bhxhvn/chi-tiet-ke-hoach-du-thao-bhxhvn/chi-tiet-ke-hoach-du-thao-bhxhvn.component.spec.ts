import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiTietKeHoachDuThaoBhxhvnComponent } from './chi-tiet-ke-hoach-du-thao-bhxhvn.component';

describe('ChiTietKeHoachDuThaoBhxhvnComponent', () => {
  let component: ChiTietKeHoachDuThaoBhxhvnComponent;
  let fixture: ComponentFixture<ChiTietKeHoachDuThaoBhxhvnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChiTietKeHoachDuThaoBhxhvnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiTietKeHoachDuThaoBhxhvnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
