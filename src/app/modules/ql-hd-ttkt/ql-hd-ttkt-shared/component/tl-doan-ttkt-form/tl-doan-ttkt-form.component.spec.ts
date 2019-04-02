import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TlDoanTtktFormComponent } from './tl-doan-ttkt-form.component';

describe('TlDoanTtktFormComponent', () => {
  let component: TlDoanTtktFormComponent;
  let fixture: ComponentFixture<TlDoanTtktFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TlDoanTtktFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TlDoanTtktFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
