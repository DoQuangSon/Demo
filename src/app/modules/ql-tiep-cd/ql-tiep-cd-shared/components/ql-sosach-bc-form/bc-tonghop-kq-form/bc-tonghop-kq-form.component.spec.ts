import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BcTonghopKqFormComponent } from './bc-tonghop-kq-form.component';

describe('BcTonghopKqFormComponent', () => {
  let component: BcTonghopKqFormComponent;
  let fixture: ComponentFixture<BcTonghopKqFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BcTonghopKqFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BcTonghopKqFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
