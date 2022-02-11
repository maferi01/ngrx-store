import { AfterViewInit, Directive, OnInit } from '@angular/core';
import { BaseComponent } from '../../../shared/abstract-app';

@Directive()
//@NameLog(NamesLog.AbstractDialogComponent)
export  class AbstractDialogComponent  extends BaseComponent implements OnInit, AfterViewInit {
//   @Input() data: any;
//  @Output() onAccept= new EventEmitter();
  
//   @ViewChild(FormComponent)
//   formComponent!: FormComponent;

//   @ViewChild('buttons')
//   templateButtons!: TemplateRef<any>;


 
 
  // onSubmit(): void {
  //   if (this.formParent.valid) {
  //     //this.authService.login(this.form.value).pipe(this.rxComp()).subscribe();
  //   }
  //   this.dialogRef.close(this.formParent.value);
  //   // this.accept.emit(this.formParent.value);
  // }
}
