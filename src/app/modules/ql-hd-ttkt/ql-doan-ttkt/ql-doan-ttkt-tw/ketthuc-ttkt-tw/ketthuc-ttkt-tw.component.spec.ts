import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KetthucTtktTwComponent } from './ketthuc-ttkt-tw.component';

describe('KetthucTtktTwComponent', () => {
  let component: KetthucTtktTwComponent;
  let fixture: ComponentFixture<KetthucTtktTwComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KetthucTtktTwComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KetthucTtktTwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
