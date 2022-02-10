import { AfterViewInit, Directive, EventEmitter, Injector, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormComponent } from '../../form/form.module';

@Directive()
//@NameLog(NamesLog.AbstractDialogComponent)
export abstract class AbstractDialogComponent implements OnInit, AfterViewInit {
  @Input() data: any;
 @Output() onAccept= new EventEmitter();
  
  @ViewChild(FormComponent)
  formComponent!: FormComponent;

  @ViewChild('buttons')
  templateButtons!: TemplateRef<any>;


  constructor(protected injector: Injector) {
 
  }

  ngOnInit(): void {
    
  }
  ngAfterViewInit(): void {
    
  }

  // onSubmit(): void {
  //   if (this.formParent.valid) {
  //     //this.authService.login(this.form.value).pipe(this.rxComp()).subscribe();
  //   }
  //   this.dialogRef.close(this.formParent.value);
  //   // this.accept.emit(this.formParent.value);
  // }
}
