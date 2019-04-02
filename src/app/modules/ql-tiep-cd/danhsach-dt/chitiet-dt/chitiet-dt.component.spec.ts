import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChitietDtComponent } from './chitiet-dt.component';

describe('ChitietDtComponent', () => {
  let component: ChitietDtComponent;
  let fixture: ComponentFixture<ChitietDtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChitietDtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChitietDtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
