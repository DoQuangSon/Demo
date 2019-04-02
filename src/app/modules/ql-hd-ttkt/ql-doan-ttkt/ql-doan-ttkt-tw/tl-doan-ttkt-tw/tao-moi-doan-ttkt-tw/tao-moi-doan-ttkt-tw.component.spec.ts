import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaoMoiDoanTtktTwComponent } from './tao-moi-doan-ttkt-tw.component';

describe('TaoMoiDoanTtktTwComponent', () => {
  let component: TaoMoiDoanTtktTwComponent;
  let fixture: ComponentFixture<TaoMoiDoanTtktTwComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaoMoiDoanTtktTwComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaoMoiDoanTtktTwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
