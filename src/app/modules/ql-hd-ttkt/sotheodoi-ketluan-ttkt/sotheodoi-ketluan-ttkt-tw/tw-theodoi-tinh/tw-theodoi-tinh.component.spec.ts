import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwTheoDoiTinhComponent } from './tw-theodoi-tinh.component';

describe('TwTheoDoiTinhComponent', () => {
  let component: TwTheoDoiTinhComponent;
  let fixture: ComponentFixture<TwTheoDoiTinhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwTheoDoiTinhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwTheoDoiTinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
