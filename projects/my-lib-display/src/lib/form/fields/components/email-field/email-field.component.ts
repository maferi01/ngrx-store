import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Optional, Output } from '@angular/core';
import { FormGroup, ControlContainer, Validators } from '@angular/forms';

@Component({
  selector: 'app-email-field',
  templateUrl: './email-field.component.html',
  styleUrls: ['./email-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmailFieldComponent implements OnInit {

  @Input()
  name!: string;
  @Input()
  value!: any;
  @Output()
  onChange = new EventEmitter();

  @Input()
  label!: string;

  @Input()
  parentFormGroup!: FormGroup;
     
   constructor(@Optional() private parentControl: ControlContainer, protected changeDet: ChangeDetectorRef) {
      
  }

  ngOnInit() {
   // console.log('parentcontrol', this.parentControl);
    this.parentFormGroup = this.parentControl?.control as FormGroup;
   
  }

  get validations(){
    return [Validators.required,Validators.email]
  }
  
}
