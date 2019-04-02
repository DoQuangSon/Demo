import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoTheodoiTiepCdComponent } from './so-theodoi-tiep-cd.component';

describe('SoTheodoiTiepCdComponent', () => {
  let component: SoTheodoiTiepCdComponent;
  let fixture: ComponentFixture<SoTheodoiTiepCdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoTheodoiTiepCdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoTheodoiTiepCdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
