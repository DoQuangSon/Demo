import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoTonghopKqFormComponent } from './so-tonghop-kq-form.component';

describe('SoTonghopKqFormComponent', () => {
  let component: SoTonghopKqFormComponent;
  let fixture: ComponentFixture<SoTonghopKqFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoTonghopKqFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoTonghopKqFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
