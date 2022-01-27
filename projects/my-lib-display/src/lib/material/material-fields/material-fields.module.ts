import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatErrorsComponent } from './components/mat-errors/mat-errors.component';
import { MatFieldDirective } from './components/mat-field.directive';
import { MaterialLayoutFieldComponent } from './components/material-layout-field/material-layout-field.component';
import { SelectFieldMaterialComponent } from './components/select-field-material/select-field-material.component';
import { TextMatFieldComponent } from './components/text-mat-field/text-mat-field.component';

export { TextMatFieldComponent, MatFieldDirective, SelectFieldMaterialComponent };


@NgModule({
  declarations: [TextMatFieldComponent, MatFieldDirective, SelectFieldMaterialComponent, MatErrorsComponent, MaterialLayoutFieldComponent],
  imports: [CommonModule,ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  exports: [TextMatFieldComponent, MatFieldDirective, SelectFieldMaterialComponent],
})
export class MaterialFieldsModule {}
