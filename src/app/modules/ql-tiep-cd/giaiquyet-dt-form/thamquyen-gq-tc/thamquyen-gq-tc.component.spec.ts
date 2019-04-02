import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThamquyenGqTcComponent } from './thamquyen-gq-tc.component';

describe('ThamquyenGqTcComponent', () => {
  let component: ThamquyenGqTcComponent;
  let fixture: ComponentFixture<ThamquyenGqTcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThamquyenGqTcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThamquyenGqTcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
