import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LsTiepCdComponent } from './ls-tiep-cd.component';

describe('LsTiepCdComponent', () => {
  let component: LsTiepCdComponent;
  let fixture: ComponentFixture<LsTiepCdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LsTiepCdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LsTiepCdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
