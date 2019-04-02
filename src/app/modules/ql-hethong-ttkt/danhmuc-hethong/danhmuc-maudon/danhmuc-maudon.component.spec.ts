import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhmucMaudonComponent } from './danhmuc-maudon.component';

describe('DanhmucMaudonComponent', () => {
  let component: DanhmucMaudonComponent;
  let fixture: ComponentFixture<DanhmucMaudonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhmucMaudonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhmucMaudonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
