import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextMatFieldComponent } from './components/text-mat-field/text-mat-field.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { MatFieldDirective } from './components/mat-field.directive';
import { SelectFieldMaterialComponent } from './components/select-field-material/select-field-material.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatErrorsComponent } from './components/mat-errors/mat-errors.component';
import { MaterialLayoutFieldComponent } from './components/material-layout-field/material-layout-field.component';

export {TextMatFieldComponent, MatFieldDirective, SelectFieldMaterialComponent};


@NgModule({
  declarations: [TextMatFieldComponent, MatFieldDirective, SelectFieldMaterialComponent, MatErrorsComponent, MaterialLayoutFieldComponent],
  imports: [CommonModule,BrowserAnimationsModule,ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  exports: [TextMatFieldComponent, MatFieldDirective, SelectFieldMaterialComponent],
})
export class MaterialFieldsModule {}
