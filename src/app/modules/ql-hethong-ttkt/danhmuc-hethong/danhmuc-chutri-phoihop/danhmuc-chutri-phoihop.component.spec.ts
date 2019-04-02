import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhmucChutriPhoihopComponent } from './danhmuc-chutri-phoihop.component';

describe('DanhmucChutriPhoihopComponent', () => {
  let component: DanhmucChutriPhoihopComponent;
  let fixture: ComponentFixture<DanhmucChutriPhoihopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhmucChutriPhoihopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhmucChutriPhoihopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
