import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeHoachBhxhTinhComponent } from './ke-hoach-bhxh-tinh.component';

describe('KeHoachBhxhTinhComponent', () => {
  let component: KeHoachBhxhTinhComponent;
  let fixture: ComponentFixture<KeHoachBhxhTinhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeHoachBhxhTinhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeHoachBhxhTinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
