import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaoKeHoachTWComponent } from './tao-ke-hoach.component';

describe('TaoKeHoachTWComponent', () => {
  let component: TaoKeHoachTWComponent;
  let fixture: ComponentFixture<TaoKeHoachTWComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaoKeHoachTWComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaoKeHoachTWComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
