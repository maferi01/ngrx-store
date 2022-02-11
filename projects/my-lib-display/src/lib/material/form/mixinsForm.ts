import { EventEmitter, TemplateRef } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Subject } from "rxjs";
import { FormField } from "../../fields/form-field.directive";
import { FormComponent } from "./form.module";


  export interface IWithForm{
    subjectFields$:Subject<FormField[]>;
    formGroup:FormGroup;
    dataFormInput: any;
  } 


  export interface IWithFormButtons{
   
    onAccept:EventEmitter<any>;
  
    templateButtons: TemplateRef<any>;

  } 