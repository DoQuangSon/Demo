import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDsDoanTtktComponent } from './modal-ds-doan-ttkt.component';

describe('ModalDsDoanTtktComponent', () => {
  let component: ModalDsDoanTtktComponent;
  let fixture: ComponentFixture<ModalDsDoanTtktComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDsDoanTtktComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDsDoanTtktComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
