import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TheodoiHdDoanTtktFormComponent } from './theodoi-hd-doan-ttkt-form.component';

describe('TheodoiHdDoanTtktFormComponent', () => {
  let component: TheodoiHdDoanTtktFormComponent;
  let fixture: ComponentFixture<TheodoiHdDoanTtktFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TheodoiHdDoanTtktFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TheodoiHdDoanTtktFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
