import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoTheodoiChitietFormComponent } from './so-theodoi-chitiet-form.component';

describe('SoTheodoiChitietFormComponent', () => {
  let component: SoTheodoiChitietFormComponent;
  let fixture: ComponentFixture<SoTheodoiChitietFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoTheodoiChitietFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoTheodoiChitietFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
