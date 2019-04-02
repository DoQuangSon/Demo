import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CongBoQDComponent } from './congbo-qd.component';

describe('QdCongboComponent', () => {
  let component: CongBoQDComponent;
  let fixture: ComponentFixture<CongBoQDComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CongBoQDComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CongBoQDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
