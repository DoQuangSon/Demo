import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KetthucTtktTinhComponent } from './ketthuc-ttkt-tinh.component';

describe('KetthucTtktTinhComponent', () => {
  let component: KetthucTtktTinhComponent;
  let fixture: ComponentFixture<KetthucTtktTinhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KetthucTtktTinhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KetthucTtktTinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
