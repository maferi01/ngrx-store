import { ChangeDetectorRef, Component, ContentChild, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { MatFormFieldControl, MatFormField } from '@angular/material/form-field';

@Component({
  selector: 'app-material-layout-field',
  templateUrl: './material-layout-field.component.html',
  styleUrls: ['./material-layout-field.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class MaterialLayoutFieldComponent implements OnInit {
  @ContentChild(MatFormFieldControl, { static: true }) _control!: MatFormFieldControl<any>;
  @ViewChild(MatFormField, { static: true }) _matFormField!: MatFormField;
  control!: AbstractControl;

  ngOnInit() {
    this.control=this._control.ngControl as any;
    this._matFormField._control = this._control;
  }
}
