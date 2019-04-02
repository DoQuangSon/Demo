import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaoKeHoachTinhComponent } from './tao-ke-hoach-tinh.component';

describe('TaoKeHoachTinhComponent', () => {
  let component: TaoKeHoachTinhComponent;
  let fixture: ComponentFixture<TaoKeHoachTinhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaoKeHoachTinhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaoKeHoachTinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
