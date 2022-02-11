import { ChangeDetectorRef, Directive, EventEmitter, Input, OnChanges, Optional, Output, SimpleChanges } from '@angular/core';
import { AbstractControlOptions, ControlContainer, FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { distinctUntilChanged, skip, tap } from 'rxjs/operators';
import { setDelay } from './utils';

@Directive({
  selector: '[appFormField]',
})
export abstract class FormField implements OnChanges{
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

  @Input()
  validations!: ValidatorFn | ValidatorFn[] | null;
  @Input()
  labelTop!: boolean;

  control!: FormControl;

  constructor(@Optional() private parentControl: ControlContainer, protected changeDet: ChangeDetectorRef) {
    this.control = new FormControl();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value']) this.control.setValue(this.value);
  }

  ngOnInit() {
   // console.log('parentcontrol', this.parentControl);
    this.parentFormGroup = this.parentControl?.control as FormGroup;
    
    setDelay(() => {
      if (this.validations) this.control.addValidators(this.validations);
      this.control.updateValueAndValidity();
    });

    this.addControl();
  }

  updateField(formGroup: FormGroup) {
    // this.parentFormGroup = formGroup;
    // this.parentFormGroup.addControl(this.name, this.control);
    // this.changeDet.detectChanges();
  }

  addControl() {
    this.parentFormGroup.addControl(this.name, this.control);
    this.control.valueChanges.pipe(tap((val) => this.onChange.emit(val))).subscribe();    
    this.control.statusChanges.pipe(
      skip(1),
      distinctUntilChanged(),
      tap((s)=> {
        //if(s==='INVALID')
        console.log('chang status errors',s) 
      }),
      tap((s)=> {
       this.changeDet.detectChanges()
      }
      )
    ).subscribe()
    
  }
}
