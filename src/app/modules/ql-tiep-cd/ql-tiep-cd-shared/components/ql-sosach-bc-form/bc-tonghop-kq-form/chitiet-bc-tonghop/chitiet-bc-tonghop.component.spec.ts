import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChitietBcTonghopComponent } from './chitiet-bc-tonghop.component';

describe('ChitietBcTonghopComponent', () => {
  let component: ChitietBcTonghopComponent;
  let fixture: ComponentFixture<ChitietBcTonghopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChitietBcTonghopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChitietBcTonghopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
