import { FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

function addError(err:object, errors_:object|null){
    return {
       ...errors_,
       ...err 
    }
}


function clearError(err:string, errors_:any){
    if(errors_)(delete errors_[err]);

    return errors_;
}



export class ValidatorsApp extends Validators {
  static compareFields(field1: string, field2: string): ValidatorFn {
    let myFun = (cc: FormGroup): ValidationErrors | null => {
      if(!cc.controls[field1] || !cc.controls[field2]) return null;  
      if (cc.controls[field1].value === cc.controls[field2].value) {
        cc.controls[field1].setErrors(addError({ Equal : true },cc.controls[field1].errors ));
        //cc.controls[field2].setErrors({ Equal : true });
      } else {
        cc.controls[field1].setErrors(clearError('Equal',cc.controls[field1].errors));
        //cc.controls[field2].setErrors(null);
      }
      return null;
    };
    return myFun as ValidatorFn;
  }

  static compareFieldsGroup(field1: string, field2: string): ValidatorFn {
    let myFun = (cc: FormGroup): ValidationErrors | null => {
      if(!cc.controls[field1] || !cc.controls[field2]) return null;  
      console.log('enter compareFieldsGroup')
      if (cc.controls[field1].value === cc.controls[field2].value) {
        return {
            Equal : true 
          };    
        //cc.setErrors({ Equal : true });
      } else {
        return null;
      }
     
    };
    return myFun as ValidatorFn;
  }

  static compareFieldsGroupb(field1: string, field2: string): ValidatorFn {
    let myFun = (cc: FormGroup): ValidationErrors | null => {
      if(!cc.controls[field1] || !cc.controls[field2]) return null;  
      console.log('enter compareFieldsGroup')
      if (cc.controls[field1].value === cc.controls[field2].value) {
        return {
            EqualBB : true 
          };    
        //cc.setErrors({ Equal : true });
      } else {
        return null;
      }
     
    };
    return myFun as ValidatorFn;
  }
  

  static compareFieldsOtherGroup(field1: string, field2: string,group1: string|null, group2: string|null): ValidatorFn {
    let myFun = (cc: FormGroup): ValidationErrors | null => {
     const control1=  group1? (cc.controls[group1] as FormGroup)?.controls[field1] :cc.controls[field1]; 
     const control2=  group2? (cc.controls[group2] as FormGroup)?.controls[field2] :cc.controls[field2]; 

      if(!control1 || !control2) return null;  
      //console.log('enter compareFieldsGroup')
      if (control1.value === control2.value) {
        return {
            EqualFieldsGroup : true 
          };    
      } else {
        return null;
      }
     
    };
    return myFun as ValidatorFn;
  }

  
}
