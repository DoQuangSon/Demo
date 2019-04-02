import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KetThucTtktFormComponent } from './ket-thuc-ttkt-form.component';

describe('KetThucTtktFormComponent', () => {
  let component: KetThucTtktFormComponent;
  let fixture: ComponentFixture<KetThucTtktFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KetThucTtktFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KetThucTtktFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
