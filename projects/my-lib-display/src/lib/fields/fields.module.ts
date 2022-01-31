import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { EmailFieldComponent } from './components/email-field/email-field.component';
import { GroupFieldComponent } from './components/group-field/group-field.component';
import { LayoutFieldComponent } from './components/layout-field/layout-field.component';
import { NumberFieldComponent } from './components/number-field/number-field.component';
import { Item, SelectFieldComponent } from './components/select-field/select-field.component';
import { TextFieldComponent } from './components/text-field/text-field.component';


export {TextFieldComponent,
  GroupFieldComponent,
  SelectFieldComponent,Item,
  EmailFieldComponent,
  NumberFieldComponent,
LayoutFieldComponent};

@NgModule({
  declarations: [ 
    TextFieldComponent,
    GroupFieldComponent,
    LayoutFieldComponent,
    SelectFieldComponent,
    EmailFieldComponent,
    NumberFieldComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [
    TextFieldComponent,
    GroupFieldComponent,
    SelectFieldComponent,
    EmailFieldComponent,
    NumberFieldComponent,
    LayoutFieldComponent
  ],
})
export class FieldsModule {}
