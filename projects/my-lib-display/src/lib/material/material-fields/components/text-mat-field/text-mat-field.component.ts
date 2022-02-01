import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormField } from '../../../../fields/form-field.directive';

@Component({
  //selector: 'app-text-field[MatField][formg]', //for  more ibludes
  selector: 'app-text-field[MatField]',
  templateUrl: './text-mat-field.component.html',
  styleUrls: ['./text-mat-field.component.scss'],
  // take care wirh import , it musb realtive import base class
  providers:[{provide:FormField, useExisting: TextMatFieldComponent}],
  changeDetection: ChangeDetectionStrategy.OnPush
  })
export class TextMatFieldComponent extends FormField  implements OnInit {

  

}
