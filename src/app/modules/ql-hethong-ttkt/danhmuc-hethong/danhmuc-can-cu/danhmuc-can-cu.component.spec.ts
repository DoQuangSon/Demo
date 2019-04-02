import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhmucCanCuComponent } from './danhmuc-can-cu.component';

describe('DanhmucCanCuComponent', () => {
  let component: DanhmucCanCuComponent;
  let fixture: ComponentFixture<DanhmucCanCuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhmucCanCuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhmucCanCuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
