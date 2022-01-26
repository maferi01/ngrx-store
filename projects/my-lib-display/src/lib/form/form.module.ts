import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormComponent } from './components/form.component';
import { FormgDirective } from './components/formg.directive';

export {FormComponent};
export {FormgDirective};
@NgModule({
  declarations: [
    FormComponent, FormgDirective,

  ],
  imports: [CommonModule,BrowserAnimationsModule, ReactiveFormsModule],
  exports: [
    ReactiveFormsModule,
    FormComponent,
    FormgDirective,
  ],
})
export class FormModule {}
