import { Component, OnInit } from '@angular/core';
import { FormField } from 'projects/my-lib-display/src/lib/form/components/form-field.directive';

@Component({
  //selector: 'app-text-field[MatField][formg]', //for  more ibludes
  selector: 'app-text-field[MatField]',
  templateUrl: './text-mat-field.component.html',
  styleUrls: ['./text-mat-field.component.scss'],
  })
export class TextMatFieldComponent extends FormField  implements OnInit {

  

}
