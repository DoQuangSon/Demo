import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChitietSoTheodoiFormComponent } from './chitiet-so-theodoi-form.component';

describe('ChitietSoTheodoiFormComponent', () => {
  let component: ChitietSoTheodoiFormComponent;
  let fixture: ComponentFixture<ChitietSoTheodoiFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChitietSoTheodoiFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChitietSoTheodoiFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
