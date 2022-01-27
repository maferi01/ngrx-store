import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectFieldMaterialComponent } from './select-field-material.component';

describe('SelectFieldMaterialComponent', () => {
  let component: SelectFieldMaterialComponent;
  let fixture: ComponentFixture<SelectFieldMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectFieldMaterialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectFieldMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
