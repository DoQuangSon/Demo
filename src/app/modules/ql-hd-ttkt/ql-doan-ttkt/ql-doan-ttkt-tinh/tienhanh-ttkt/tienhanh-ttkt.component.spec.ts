import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TienHanhTTKTComponent } from './tienhanh-ttkt.component';

describe('ThTtktTinhComponent', () => {
  let component: TienHanhTTKTComponent;
  let fixture: ComponentFixture<TienHanhTTKTComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TienHanhTTKTComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TienHanhTTKTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
