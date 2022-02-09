import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormField } from 'projects/my-lib-display/src/lib/fields/form-field.directive';

@Component({
  selector: 'lib-number-mat-field',
  templateUrl: './number-mat-field.component.html',
  styleUrls: ['./number-mat-field.component.css'],
  providers:[{provide:FormField, useExisting: NumberMatFieldComponent}],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NumberMatFieldComponent extends FormField implements OnInit {

  }
