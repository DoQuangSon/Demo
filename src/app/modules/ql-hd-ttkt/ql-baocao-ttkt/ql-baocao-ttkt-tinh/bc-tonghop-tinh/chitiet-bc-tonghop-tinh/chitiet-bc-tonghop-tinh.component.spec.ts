import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChitietBcTonghopTinhComponent } from './chitiet-bc-tonghop-tinh.component';

describe('ChitietBcTonghopTinhComponent', () => {
  let component: ChitietBcTonghopTinhComponent;
  let fixture: ComponentFixture<ChitietBcTonghopTinhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChitietBcTonghopTinhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChitietBcTonghopTinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
