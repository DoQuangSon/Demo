import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhmucHanhviComponent } from './danhmuc-hanhvi.component';

describe('DanhmucHanhviComponent', () => {
  let component: DanhmucHanhviComponent;
  let fixture: ComponentFixture<DanhmucHanhviComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhmucHanhviComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhmucHanhviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
