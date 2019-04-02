import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TcTiepCdComponent } from './tc-tiep-cd.component';

describe('TcTiepCdComponent', () => {
  let component: TcTiepCdComponent;
  let fixture: ComponentFixture<TcTiepCdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TcTiepCdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TcTiepCdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
