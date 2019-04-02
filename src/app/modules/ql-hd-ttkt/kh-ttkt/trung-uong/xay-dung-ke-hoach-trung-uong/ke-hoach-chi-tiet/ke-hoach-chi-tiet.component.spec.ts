import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeHoachChiTietComponent } from './ke-hoach-chi-tiet.component';

describe('KeHoachChiTietComponent', () => {
  let component: KeHoachChiTietComponent;
  let fixture: ComponentFixture<KeHoachChiTietComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeHoachChiTietComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeHoachChiTietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
