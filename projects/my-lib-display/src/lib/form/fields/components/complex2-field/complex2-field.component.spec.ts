import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Complex2FieldComponent } from './complex2-field.component';

describe('Complex2FieldComponent', () => {
  let component: Complex2FieldComponent;
  let fixture: ComponentFixture<Complex2FieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Complex2FieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Complex2FieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
