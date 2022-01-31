import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ContentChildren, EventEmitter, Input, OnInit, Output, QueryList, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn } from '@angular/forms';
import { FormField } from '../../../fields/form-field.directive';
import {tap} from 'rxjs/operators'
import { setDelay } from '../../../fields/utils';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent implements OnInit,AfterContentInit {

  @ContentChild(TemplateRef) templateFields!:TemplateRef<any>;
  group!: FormGroup;

  @ContentChildren(FormField,{descendants:true})
  fields!: QueryList<FormField>;

  @Output()
  onAccept:EventEmitter<any>= new EventEmitter;

  @Input()
  validations!: ValidatorFn | ValidatorFn[] | null;

  constructor(private formBuilder: FormBuilder,private detect:ChangeDetectorRef) {
    this.createForm();
   }
  
   ngAfterContentInit(): void {
     this.fields.changes.pipe(
      // tap(() => console.log('fields change ',this.fields)),
       tap(() => this.updateFields())
     ).subscribe();
  }


  updateFields(){
    this.fields.forEach(field=>{
     // console.log('field',field.name,field.control);
     //  field.updateField(this.formGroup);
    })
  }  



  createForm(){
    this.group= this.formBuilder.group({});
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

  ngOnInit(): void {
  }


  accept(){
    this.onAccept.emit(this.group.value);
  }

  validShow(){
   this.group.markAllAsTouched();
   //(this.group.controls['mygroup'] as FormGroup).controls['email'].updateValueAndValidity();
   
  }

  get isValid(){
    return this.group.valid;
  }
}


