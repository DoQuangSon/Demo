import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVphcFormComponent } from './modal-vphc-form.component';

describe('ModalVphcFormComponent', () => {
  let component: ModalVphcFormComponent;
  let fixture: ComponentFixture<ModalVphcFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalVphcFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalVphcFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
