import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalQdxpVphcFormComponent } from './modal-qdxp-vphc-form.component';

describe('ModalQdxpVphcFormComponent', () => {
  let component: ModalQdxpVphcFormComponent;
  let fixture: ComponentFixture<ModalQdxpVphcFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalQdxpVphcFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalQdxpVphcFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
