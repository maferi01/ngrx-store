import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-mat-errors',
  templateUrl: './mat-errors.component.html',
  styleUrls: ['./mat-errors.component.scss']
})
export class MatErrorsComponent implements OnInit {

  @Input()
  parentFormGroup!: FormGroup;
  @Input()
  control!: AbstractControl;
  
  constructor() { }

  ngOnInit(): void {
  }
  get errors(){
    return this.control?.errors?Object.keys(this.control?.errors as object):[];
  }

}
