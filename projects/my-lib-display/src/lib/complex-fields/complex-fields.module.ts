import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Complex2FieldComponent } from './complex2-field/complex2-field.component';
import { ComplexFieldComponent } from './complex-field/complex-field.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldsModule } from '../fields/fields.module';
export {Complex2FieldComponent,ComplexFieldComponent};


@NgModule({
  declarations: [Complex2FieldComponent,ComplexFieldComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FieldsModule
  ],
  exports: [Complex2FieldComponent,ComplexFieldComponent],
})
export class ComplexFieldsModule { }
