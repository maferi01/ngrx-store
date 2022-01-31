import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormField } from '../../form-field.directive';

export type Item= {value: string, desc:string};

@Component({
  selector: 'app-select-field:not([MatField])',
  templateUrl: './select-field.component.html',
  styleUrls: ['./select-field.component.scss'],
  providers:[{provide:FormField, useExisting: SelectFieldComponent}],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectFieldComponent extends FormField  implements OnInit {
   @Input()
   listItems: Item[]|null=[]; 
}
