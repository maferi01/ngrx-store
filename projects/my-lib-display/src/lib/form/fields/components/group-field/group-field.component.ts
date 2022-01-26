import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { ControlContainer, FormBuilder, FormGroup, ValidatorFn } from '@angular/forms';
import { setDelay } from '../../../components/utils';

@Component({
  selector: 'app-group-field',
  templateUrl: './group-field.component.html',
  styleUrls: ['./group-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupFieldComponent   {
  
  @Input()
  name!: string;
  @Input()
  label!: string;

  @Input()
  parentFormGroup!: FormGroup;

  @Input()
  columnFields!: boolean;

  group!: FormGroup;
  @ContentChild(TemplateRef) templateFields!:TemplateRef<any>;

  @Input()
  validations!: ValidatorFn | ValidatorFn[] | null;

  constructor( private parentControl: ControlContainer, private formBuilder: FormBuilder, protected changeDet: ChangeDetectorRef) {
    this.group =this.formBuilder.group({}) ;
  }

  ngOnInit() {
   // console.log('parentcontrol', this.parentControl);
    this.parentFormGroup = this.parentControl?.control as FormGroup;
    this.addControl();
  }
  
  addControl() {
    this.parentFormGroup.addControl(this.name, this.group);  
    setDelay(()=>{
      if(this.validations){
        this.group.setValidators(this.validations);
        this.group.updateValueAndValidity();
      }
    })
  }

  get errors(){
    return Object.keys(this.group.errors as object);
  }
}
