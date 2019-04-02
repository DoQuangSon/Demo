import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChitietHdDonviFormComponent } from './chitiet-hd-donvi-form.component';

describe('ChitietHdDonviFormComponent', () => {
  let component: ChitietHdDonviFormComponent;
  let fixture: ComponentFixture<ChitietHdDonviFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChitietHdDonviFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChitietHdDonviFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
