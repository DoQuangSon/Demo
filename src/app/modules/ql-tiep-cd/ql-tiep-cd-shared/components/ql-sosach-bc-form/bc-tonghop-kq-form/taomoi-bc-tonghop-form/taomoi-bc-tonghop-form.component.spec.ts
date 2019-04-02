import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaomoiBcTonghopFormComponent } from './taomoi-bc-tonghop-form.component';

describe('TaomoiBcTonghopFormComponent', () => {
  let component: TaomoiBcTonghopFormComponent;
  let fixture: ComponentFixture<TaomoiBcTonghopFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaomoiBcTonghopFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaomoiBcTonghopFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
