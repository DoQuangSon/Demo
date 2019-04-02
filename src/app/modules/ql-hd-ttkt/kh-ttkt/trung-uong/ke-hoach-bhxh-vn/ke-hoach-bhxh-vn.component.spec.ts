import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeHoachBhxhVnComponent } from './ke-hoach-bhxh-vn.component';

describe('KeHoachBhxhVnComponent', () => {
  let component: KeHoachBhxhVnComponent;
  let fixture: ComponentFixture<KeHoachBhxhVnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeHoachBhxhVnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeHoachBhxhVnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
