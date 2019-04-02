import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiphikhamchuabenhComponent } from './chiphikhamchuabenh.component';

describe('ChiphikhamchuabenhComponent', () => {
  let component: ChiphikhamchuabenhComponent;
  let fixture: ComponentFixture<ChiphikhamchuabenhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChiphikhamchuabenhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiphikhamchuabenhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
