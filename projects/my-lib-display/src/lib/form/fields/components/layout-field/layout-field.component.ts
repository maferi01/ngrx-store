import { Component, ContentChild, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormGroup, NgControl } from '@angular/forms';

@Component({
  selector: 'app-layout-field',
  templateUrl: './layout-field.component.html',
  styleUrls: ['./layout-field.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LayoutFieldComponent implements OnInit {
  @Input()
  parentFormGroup!: FormGroup;
  control!: AbstractControl;
  @Input()
  labelTop!:boolean;
  @ContentChild(NgControl,{static:true}) contrlx!:NgControl;

  constructor() { }

  ngOnInit(): void {
    console.log('ngcontrol',this.contrlx);
    this.control=this.contrlx as any;
  }
  get errors(){
    return Object.keys(this.control.errors as object);
  }
}
