import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChitietSoTheodoiDonviFormComponent } from './chitiet-so-theodoi-donvi-form.component';

describe('ChitietSoTheodoiDonviFormComponent', () => {
  let component: ChitietSoTheodoiDonviFormComponent;
  let fixture: ComponentFixture<ChitietSoTheodoiDonviFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChitietSoTheodoiDonviFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChitietSoTheodoiDonviFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
