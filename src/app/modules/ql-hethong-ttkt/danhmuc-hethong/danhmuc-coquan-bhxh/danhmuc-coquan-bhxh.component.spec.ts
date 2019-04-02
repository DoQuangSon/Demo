import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhmucCoquanBhxhComponent } from './danhmuc-coquan-bhxh.component';

describe('DanhmucCoquanBhxhComponent', () => {
  let component: DanhmucCoquanBhxhComponent;
  let fixture: ComponentFixture<DanhmucCoquanBhxhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhmucCoquanBhxhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhmucCoquanBhxhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
