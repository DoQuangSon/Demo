import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThamquyenGqKnComponent } from './thamquyen-gq-kn.component';

describe('ThamquyenGqKnComponent', () => {
  let component: ThamquyenGqKnComponent;
  let fixture: ComponentFixture<ThamquyenGqKnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThamquyenGqKnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThamquyenGqKnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
