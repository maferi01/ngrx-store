import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormField } from '../../form-field.directive';
import { setDelay } from '../../utils';

export type Item= {value: string, desc:string};

@Component({
  selector: 'app-select-field:not([MatField])',
  templateUrl: './select-field.component.html',
  styleUrls: ['./select-field.component.scss'],
  providers:[{provide:FormField, useExisting: SelectFieldComponent}],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectFieldComponent extends FormField  implements OnInit {
  private _listItems: Item[] | null = [];
  @Input()  
  public set listItems(value: Item[] | null) {
    this._listItems = value;
    setDelay(()=>value && value?.length>1?this.control?.setValue(''):this.control?.setValue(value ?value[0]?.value:''))
    
   
  } 
  public get listItems(): Item[] | null {
    return this._listItems;
  }
 
}
