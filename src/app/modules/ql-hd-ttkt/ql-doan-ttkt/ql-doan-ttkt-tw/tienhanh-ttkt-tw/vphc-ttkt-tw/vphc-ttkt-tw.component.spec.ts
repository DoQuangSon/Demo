import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VphcTtktTwComponent } from './vphc-ttkt-tw.component';

describe('VphcTtktTwComponent', () => {
  let component: VphcTtktTwComponent;
  let fixture: ComponentFixture<VphcTtktTwComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VphcTtktTwComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VphcTtktTwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
