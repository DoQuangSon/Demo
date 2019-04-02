import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeHoachChoDuyetComponent } from './ke-hoach-cho-duyet.component';

describe('KeHoachChoDuyetComponent', () => {
  let component: KeHoachChoDuyetComponent;
  let fixture: ComponentFixture<KeHoachChoDuyetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeHoachChoDuyetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeHoachChoDuyetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
