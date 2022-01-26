import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColInfoComponent } from './col-info.component';

describe('ColInfoComponent', () => {
  let component: ColInfoComponent;
  let fixture: ComponentFixture<ColInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
