import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChitietSoTonghopKqFormComponent } from './chitiet-so-tonghop-kq-form.component';

describe('ChitietSoTonghopKqFormComponent', () => {
  let component: ChitietSoTonghopKqFormComponent;
  let fixture: ComponentFixture<ChitietSoTonghopKqFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChitietSoTonghopKqFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChitietSoTonghopKqFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
