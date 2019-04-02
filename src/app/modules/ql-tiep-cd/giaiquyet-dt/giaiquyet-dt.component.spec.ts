import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiaiquyetDtComponent } from './giaiquyet-dt.component';

describe('GiaiquyetDtComponent', () => {
  let component: GiaiquyetDtComponent;
  let fixture: ComponentFixture<GiaiquyetDtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiaiquyetDtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiaiquyetDtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
