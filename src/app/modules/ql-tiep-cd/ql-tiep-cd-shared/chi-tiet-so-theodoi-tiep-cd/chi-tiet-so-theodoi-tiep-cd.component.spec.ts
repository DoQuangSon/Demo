import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiTietSoTheodoiTiepCdComponent } from './chi-tiet-so-theodoi-tiep-cd.component';

describe('ChiTietSoTheodoiTiepCdComponent', () => {
  let component: ChiTietSoTheodoiTiepCdComponent;
  let fixture: ComponentFixture<ChiTietSoTheodoiTiepCdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChiTietSoTheodoiTiepCdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiTietSoTheodoiTiepCdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
