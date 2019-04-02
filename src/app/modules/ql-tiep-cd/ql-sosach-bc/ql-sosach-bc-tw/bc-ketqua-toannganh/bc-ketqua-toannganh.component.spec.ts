import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BcKetquaToannganhComponent } from './bc-ketqua-toannganh.component';

describe('BcKetquaToannganhComponent', () => {
  let component: BcKetquaToannganhComponent;
  let fixture: ComponentFixture<BcKetquaToannganhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BcKetquaToannganhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BcKetquaToannganhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
