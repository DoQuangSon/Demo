import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiTietSoTheodoiTiepCdLiveComponent } from './chi-tiet-so-theodoi-tiep-cd-live.component';

describe('ChiTietSoTheodoiTiepCdLiveComponent', () => {
  let component: ChiTietSoTheodoiTiepCdLiveComponent;
  let fixture: ComponentFixture<ChiTietSoTheodoiTiepCdLiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChiTietSoTheodoiTiepCdLiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiTietSoTheodoiTiepCdLiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
