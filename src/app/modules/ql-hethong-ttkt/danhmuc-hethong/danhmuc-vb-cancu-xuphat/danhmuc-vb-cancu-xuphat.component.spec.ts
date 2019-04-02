import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhmucVbCancuXuphatComponent } from './danhmuc-vb-cancu-xuphat.component';

describe('DanhmucVbCancuXuphatComponent', () => {
  let component: DanhmucVbCancuXuphatComponent;
  let fixture: ComponentFixture<DanhmucVbCancuXuphatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhmucVbCancuXuphatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhmucVbCancuXuphatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
