import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChitietDsDonviComponent } from './chitiet-ds-donvi.component';

describe('ChitietDsDonviComponent', () => {
  let component: ChitietDsDonviComponent;
  let fixture: ComponentFixture<ChitietDsDonviComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChitietDsDonviComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChitietDsDonviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
