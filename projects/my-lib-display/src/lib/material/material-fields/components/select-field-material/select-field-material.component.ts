import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SelectFieldComponent } from 'projects/my-lib-display/src/lib/fields/fields.module';


@Component({
  selector: 'app-select-field[MatField]',
  templateUrl: './select-field-material.component.html',
  styleUrls: ['./select-field-material.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class SelectFieldMaterialComponent extends SelectFieldComponent implements OnInit {

 

}
