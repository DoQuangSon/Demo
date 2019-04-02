import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintToCaoCanBoComponent } from './print-to-cao-can-bo.component';

describe('PrintToCaoCanBoComponent', () => {
  let component: PrintToCaoCanBoComponent;
  let fixture: ComponentFixture<PrintToCaoCanBoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintToCaoCanBoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintToCaoCanBoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
