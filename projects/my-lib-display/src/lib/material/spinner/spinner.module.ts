import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner/spinner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SpinnerLoadingDirective } from './spinner-loading.directive'

export {SpinnerComponent,SpinnerLoadingDirective};

@NgModule({
  declarations: [
    SpinnerComponent,
    SpinnerLoadingDirective
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ],
  exports:[
    SpinnerComponent,
    SpinnerLoadingDirective
  ]
})
export class SpinnerModule { }
