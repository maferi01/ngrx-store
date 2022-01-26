import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { SelectFieldComponent } from '../../../fields/components/select-field/select-field.component';

@Component({
  selector: 'app-select-field[MatField]',
  templateUrl: './select-field-material.component.html',
  styleUrls: ['./select-field-material.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class SelectFieldMaterialComponent extends SelectFieldComponent implements OnInit {

 

}
