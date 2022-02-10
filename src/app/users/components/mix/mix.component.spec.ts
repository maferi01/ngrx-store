import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MIxComponent } from './mix.component';

describe('MIxComponent', () => {
  let component: MIxComponent;
  let fixture: ComponentFixture<MIxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MIxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MIxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
