import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThamquyenGqKnpaComponent } from './thamquyen-gq-knpa.component';

describe('ThamquyenGqKnpaComponent', () => {
  let component: ThamquyenGqKnpaComponent;
  let fixture: ComponentFixture<ThamquyenGqKnpaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThamquyenGqKnpaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThamquyenGqKnpaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
