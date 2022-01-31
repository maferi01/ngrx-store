import { Component, OnInit } from '@angular/core';
import { FormField } from '../../../form/components/form-field.directive';

@Component({
  selector: 'app-number-field',
  templateUrl: './number-field.component.html',
  styleUrls: ['./number-field.component.scss']
})
export class NumberFieldComponent extends FormField  implements OnInit {



}
