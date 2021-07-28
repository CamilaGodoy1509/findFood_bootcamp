import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgRestauranteComponent } from './pg-restaurante.component';

describe('PgRestauranteComponent', () => {
  let component: PgRestauranteComponent;
  let fixture: ComponentFixture<PgRestauranteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PgRestauranteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PgRestauranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
