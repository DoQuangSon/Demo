import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalLuuComponent } from './modal-luu.component';

describe('ModalLuuComponent', () => {
  let component: ModalLuuComponent;
  let fixture: ComponentFixture<ModalLuuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalLuuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalLuuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
