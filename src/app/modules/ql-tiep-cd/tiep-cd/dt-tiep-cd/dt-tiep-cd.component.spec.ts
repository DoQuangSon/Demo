import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DtTiepCdComponent } from './dt-tiep-cd.component';

describe('DtTiepCdComponent', () => {
  let component: DtTiepCdComponent;
  let fixture: ComponentFixture<DtTiepCdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DtTiepCdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DtTiepCdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
