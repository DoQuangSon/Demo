import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaomoiBcTonghopTinhComponent } from './taomoi-bc-tonghop-tinh.component';

describe('TaomoiBcTonghopTinhComponent', () => {
  let component: TaomoiBcTonghopTinhComponent;
  let fixture: ComponentFixture<TaomoiBcTonghopTinhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaomoiBcTonghopTinhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaomoiBcTonghopTinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
