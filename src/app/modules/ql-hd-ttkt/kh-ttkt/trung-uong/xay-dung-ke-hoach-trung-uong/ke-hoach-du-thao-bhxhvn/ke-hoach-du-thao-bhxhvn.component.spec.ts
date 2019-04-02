import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeHoachDuThaoBhxhvnComponent } from './ke-hoach-du-thao-bhxhvn.component';

describe('KeHoachDuThaoBhxhvnComponent', () => {
  let component: KeHoachDuThaoBhxhvnComponent;
  let fixture: ComponentFixture<KeHoachDuThaoBhxhvnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeHoachDuThaoBhxhvnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeHoachDuThaoBhxhvnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
