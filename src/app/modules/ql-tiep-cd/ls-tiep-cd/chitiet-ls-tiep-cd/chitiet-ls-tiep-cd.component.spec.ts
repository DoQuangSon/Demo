import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChitietLsTiepCdComponent } from './chitiet-ls-tiep-cd.component';

describe('ChitietLsTiepCdComponent', () => {
  let component: ChitietLsTiepCdComponent;
  let fixture: ComponentFixture<ChitietLsTiepCdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChitietLsTiepCdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChitietLsTiepCdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
