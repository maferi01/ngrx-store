import { Component, Input, OnInit } from '@angular/core';
import { NameLog } from 'src/app/services/utils/logger';
import { BaseComponent } from 'src/app/shared/base/abstract-app';
import { withDestroy } from 'src/app/shared/base/mixings-comp';
import { InputExtraFields, InputFields } from '../users/users.component';

@Component({
  
  selector: 'app-mix',
  templateUrl: './mix.component.html',
  styleUrls: ['./mix.component.scss'],
 // inputs:['dataInput']
  
})
@NameLog('MixComponent')
export class MixComponent  extends InputExtraFields(InputFields(withDestroy(BaseComponent)))  implements OnInit {

  @Input()  
    override dataExtraInput: string='data Input';
  @Input()  
     override dataInput: string='data Input';


  override ngOnInit(): void {
    super.ngOnInit()
  }

}
