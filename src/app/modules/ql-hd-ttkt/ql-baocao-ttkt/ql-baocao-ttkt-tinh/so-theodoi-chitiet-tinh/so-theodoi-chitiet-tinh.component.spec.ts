import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoTheodoiChitietTinhComponent } from './so-theodoi-chitiet-tinh.component';

describe('SoTheodoiChitietTinhComponent', () => {
  let component: SoTheodoiChitietTinhComponent;
  let fixture: ComponentFixture<SoTheodoiChitietTinhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoTheodoiChitietTinhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoTheodoiChitietTinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
