import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapNhatSoTheoDoiComponent } from './capnhat-sotheodoi.component';

describe('ChitietSotheodoiComponent', () => {
  let component: CapNhatSoTheoDoiComponent;
  let fixture: ComponentFixture<CapNhatSoTheoDoiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapNhatSoTheoDoiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapNhatSoTheoDoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
