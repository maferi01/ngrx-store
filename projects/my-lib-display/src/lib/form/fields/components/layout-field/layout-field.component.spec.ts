import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutFieldComponent } from './layout-field.component';

describe('LayoutFieldComponent', () => {
  let component: LayoutFieldComponent;
  let fixture: ComponentFixture<LayoutFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
