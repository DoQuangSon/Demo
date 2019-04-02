import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KetquaTtktComponent } from './ketqua-ttkt.component';

describe('KetquaTtktComponent', () => {
  let component: KetquaTtktComponent;
  let fixture: ComponentFixture<KetquaTtktComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KetquaTtktComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KetquaTtktComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
