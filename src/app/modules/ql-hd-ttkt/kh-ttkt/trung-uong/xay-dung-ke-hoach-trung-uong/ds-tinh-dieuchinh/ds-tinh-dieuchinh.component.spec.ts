import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DsTinhDieuchinhComponent } from './ds-tinh-dieuchinh.component';

describe('DsTinhDieuchinhComponent', () => {
  let component: DsTinhDieuchinhComponent;
  let fixture: ComponentFixture<DsTinhDieuchinhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DsTinhDieuchinhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DsTinhDieuchinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
