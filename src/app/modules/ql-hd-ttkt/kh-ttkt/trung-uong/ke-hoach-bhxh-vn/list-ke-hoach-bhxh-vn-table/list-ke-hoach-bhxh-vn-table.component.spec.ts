import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListKeHoachBhxhVnTableComponent } from './list-ke-hoach-bhxh-vn-table.component';

describe('ListKeHoachBhxhVnTableComponent', () => {
  let component: ListKeHoachBhxhVnTableComponent;
  let fixture: ComponentFixture<ListKeHoachBhxhVnTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListKeHoachBhxhVnTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListKeHoachBhxhVnTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
