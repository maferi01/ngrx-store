import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from '../material/button/button.module';
import { FormComponent } from './components/form.component';
import { FormgDirective } from './components/formg.directive';


export { FormComponent };
export { FormgDirective };
@NgModule({
  declarations: [
    FormComponent, FormgDirective,

  ],
  imports: [CommonModule, ReactiveFormsModule, ButtonModule],
  exports: [
    ReactiveFormsModule,
    FormComponent,
    FormgDirective,
  ],
})
export class FormModule {}
