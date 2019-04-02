import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoTheodoiTiepnhanComponent } from './so-theodoi-tiepnhan.component';

describe('SoTheodoiTiepnhanComponent', () => {
  let component: SoTheodoiTiepnhanComponent;
  let fixture: ComponentFixture<SoTheodoiTiepnhanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoTheodoiTiepnhanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoTheodoiTiepnhanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
