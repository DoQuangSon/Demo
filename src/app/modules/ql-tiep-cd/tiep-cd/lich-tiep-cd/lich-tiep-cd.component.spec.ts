import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LichTiepCdComponent } from './lich-tiep-cd.component';

describe('LichTiepCdComponent', () => {
  let component: LichTiepCdComponent;
  let fixture: ComponentFixture<LichTiepCdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LichTiepCdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LichTiepCdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
