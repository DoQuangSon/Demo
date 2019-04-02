import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DieuChinhComponent } from './dieu-chinh.component';

describe('DieuChinhComponent', () => {
  let component: DieuChinhComponent;
  let fixture: ComponentFixture<DieuChinhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DieuChinhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DieuChinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
