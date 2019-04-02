import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiTietDoanTtktFormComponent } from './chi-tiet-doan-ttkt-form.component';

describe('ChiTietDoanTtktFormComponent', () => {
  let component: ChiTietDoanTtktFormComponent;
  let fixture: ComponentFixture<ChiTietDoanTtktFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChiTietDoanTtktFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiTietDoanTtktFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
