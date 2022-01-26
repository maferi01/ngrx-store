import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormField } from '../../../components/form-field.directive';

@Component({
  //selector: 'app-text-field:not([MatField]):not([formg])', // for more exceptions 
  selector: 'app-text-field:not([MatField])',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss'],
  providers:[{provide:FormField, useExisting: TextFieldComponent}],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextFieldComponent  extends FormField implements OnInit {

 // constructor() {super() }

  override ngOnInit(): void {
    super.ngOnInit();
  }



}
