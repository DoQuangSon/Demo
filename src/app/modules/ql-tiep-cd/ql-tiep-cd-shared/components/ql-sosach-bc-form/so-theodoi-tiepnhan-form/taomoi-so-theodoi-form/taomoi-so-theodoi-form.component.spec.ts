import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaomoiSoTheodoiFormComponent } from './taomoi-so-theodoi-form.component';

describe('TaomoiSoTheodoiFormComponent', () => {
  let component: TaomoiSoTheodoiFormComponent;
  let fixture: ComponentFixture<TaomoiSoTheodoiFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaomoiSoTheodoiFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaomoiSoTheodoiFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
