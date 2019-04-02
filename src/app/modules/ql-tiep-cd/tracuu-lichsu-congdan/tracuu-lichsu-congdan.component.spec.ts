import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TracuuLichsuCongdanComponent } from './tracuu-lichsu-congdan.component';

describe('TracuuLichsuCongdanComponent', () => {
  let component: TracuuLichsuCongdanComponent;
  let fixture: ComponentFixture<TracuuLichsuCongdanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TracuuLichsuCongdanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TracuuLichsuCongdanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
