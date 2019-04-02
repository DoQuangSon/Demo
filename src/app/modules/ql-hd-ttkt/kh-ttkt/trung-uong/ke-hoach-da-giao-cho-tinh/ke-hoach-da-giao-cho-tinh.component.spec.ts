import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeHoachDaGiaoChoTinhComponent } from './ke-hoach-da-giao-cho-tinh.component';

describe('KeHoachDaGiaoChoTinhComponent', () => {
  let component: KeHoachDaGiaoChoTinhComponent;
  let fixture: ComponentFixture<KeHoachDaGiaoChoTinhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeHoachDaGiaoChoTinhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeHoachDaGiaoChoTinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
