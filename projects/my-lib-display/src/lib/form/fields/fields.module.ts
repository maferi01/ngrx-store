import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ComplexFieldComponent } from './components/complex-field/complex-field.component';
import { Complex2FieldComponent } from './components/complex2-field/complex2-field.component';
import { EmailFieldComponent } from './components/email-field/email-field.component';
import { GroupFieldComponent } from './components/group-field/group-field.component';
import { FieldInsideDirective } from './components/layout-field/field-inside.directive';
import { LayoutFieldComponent } from './components/layout-field/layout-field.component';
import { NumberFieldComponent } from './components/number-field/number-field.component';
import { SelectFieldComponent } from './components/select-field/select-field.component';
import { TextFieldComponent } from './components/text-field/text-field.component';


export {TextFieldComponent,
  GroupFieldComponent,
  SelectFieldComponent,
  ComplexFieldComponent,
  Complex2FieldComponent,
  EmailFieldComponent,
  NumberFieldComponent};

@NgModule({
  declarations: [
    TextFieldComponent,
    GroupFieldComponent,
    LayoutFieldComponent,
    SelectFieldComponent,
    ComplexFieldComponent,
    FieldInsideDirective,
    EmailFieldComponent,
    Complex2FieldComponent,
    NumberFieldComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [
    TextFieldComponent,
    GroupFieldComponent,
    SelectFieldComponent,
    ComplexFieldComponent,
    Complex2FieldComponent,
    EmailFieldComponent,
    NumberFieldComponent,
  ],
})
export class FieldsModule {}
