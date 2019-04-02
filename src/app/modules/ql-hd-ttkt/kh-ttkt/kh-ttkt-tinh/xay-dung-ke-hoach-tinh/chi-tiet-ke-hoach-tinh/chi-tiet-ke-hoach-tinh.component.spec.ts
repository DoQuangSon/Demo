import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiTietKeHoachTinhComponent } from './chi-tiet-ke-hoach-tinh.component';

describe('ChiTietKeHoachTinhComponent', () => {
  let component: ChiTietKeHoachTinhComponent;
  let fixture: ComponentFixture<ChiTietKeHoachTinhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChiTietKeHoachTinhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiTietKeHoachTinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
