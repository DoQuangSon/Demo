import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaoMoiDoanTtktComponent } from './tao-moi-doan-ttkt.component';

describe('TaoMoiDoanTtktComponent', () => {
  let component: TaoMoiDoanTtktComponent;
  let fixture: ComponentFixture<TaoMoiDoanTtktComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaoMoiDoanTtktComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaoMoiDoanTtktComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
