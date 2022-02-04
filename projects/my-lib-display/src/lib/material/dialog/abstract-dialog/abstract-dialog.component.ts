import { Component, OnInit, Directive, Input, EventEmitter, Injector, ViewChild, AfterViewInit, TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormComponent } from '../../form/form.module';
@Directive()
//@NameLog(NamesLog.AbstractDialogComponent)
export abstract class AbstractDialogComponent<E = object, T = object> implements OnInit, AfterViewInit {
  @Input() filters: any;
  //submitEmit: EventEmitter<T> = new EventEmitter();

  //formParent: FormGroup;
  dialogRef: MatDialogRef<any, any>;
  dataDialog: E;
  @ViewChild(FormComponent)
  formComponent: FormComponent;

  @ViewChild('buttons')
  templateButtons: TemplateRef<any>;


  //abstract getFormGroup(): FormGroup;

  constructor(protected injector: Injector) {
    this.dialogRef = this.injector.get(MatDialogRef);
    this.dataDialog = this.injector.get(MAT_DIALOG_DATA);
    //  console.log('Abstract filter created **')
  }

  ngOnInit(): void {
    //this.formParent = this.getFormGroup();
  }
  ngAfterViewInit(): void {
    //this.displayDialog.accept.subscribe(() => this.onSubmit());
  }

  // onSubmit(): void {
  //   if (this.formParent.valid) {
  //     //this.authService.login(this.form.value).pipe(this.rxComp()).subscribe();
  //   }
  //   this.dialogRef.close(this.formParent.value);
  //   // this.accept.emit(this.formParent.value);
  // }
}
