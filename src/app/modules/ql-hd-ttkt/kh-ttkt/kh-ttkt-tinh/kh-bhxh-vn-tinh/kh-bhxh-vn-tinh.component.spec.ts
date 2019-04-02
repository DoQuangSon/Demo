import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KhBhxhVnTinhComponent } from './kh-bhxh-vn-tinh.component';

describe('KhBhxhVnTinhComponent', () => {
  let component: KhBhxhVnTinhComponent;
  let fixture: ComponentFixture<KhBhxhVnTinhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KhBhxhVnTinhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KhBhxhVnTinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
