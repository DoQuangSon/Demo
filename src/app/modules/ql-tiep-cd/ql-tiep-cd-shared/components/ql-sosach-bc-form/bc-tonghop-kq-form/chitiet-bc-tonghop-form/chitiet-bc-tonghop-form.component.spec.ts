import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChitietBcTonghopFormComponent } from './chitiet-bc-tonghop-form.component';

describe('ChitietBcTonghopFormComponent', () => {
  let component: ChitietBcTonghopFormComponent;
  let fixture: ComponentFixture<ChitietBcTonghopFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChitietBcTonghopFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChitietBcTonghopFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
