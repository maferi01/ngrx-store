import { ComponentType } from '@angular/cdk/portal';
import { ChangeDetectorRef, Component, ComponentRef, EventEmitter, Injector, Input, OnInit, Output, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AbstractDialogComponent } from '../dialog.module';
import { IDialog } from './modelDialog';

@Component({
  selector: 'lib-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  @Input() filters: any;
  submitEmit: EventEmitter<any> = new EventEmitter();

  @Input() title!: string;
  @Output() accept: EventEmitter<object>=new EventEmitter();

  @ViewChild('dialogInside',{read:ViewContainerRef})
  viewContainerInside!:ViewContainerRef;

  
  dialogRef: MatDialogRef<any, any>;
  dataDialog: {
    compInsideDialog: ComponentType<any>
  };
  detect: ChangeDetectorRef;
  compInside!: ComponentRef<AbstractDialogComponent>;
  dialogInstance!:IDialog;  
  formInside?:FormGroup;
  templateButtons?:TemplateRef<any>;

  //abstract getFormGroup(): FormGroup;

  constructor(protected injector: Injector) {
    this.dialogRef = this.injector.get(MatDialogRef);
    this.dataDialog = this.injector.get(MAT_DIALOG_DATA);
    this.detect=this.injector.get(ChangeDetectorRef);
    //  console.log('Abstract filter created **')
  }

  ngOnInit(): void {
    
    //this.formParent = this.getFormGroup();
  }
  ngAfterViewInit(): void {
    this.createInside();
    //this.displayDialog.accept.subscribe(() => this.onSubmit());
  }

  onSubmit(): void {
    // if (this.formParent.valid) {
    //   //this.authService.login(this.form.value).pipe(this.rxComp()).subscribe();
    // }
     this.dialogRef.close(this.formInside?.value);
    // // this.accept.emit(this.formParent.value);
  }


  createInside(){
    this.compInside=this.viewContainerInside.createComponent(this.dataDialog.compInsideDialog);
    this.dialogInstance= (this.compInside.instance as any) as IDialog;
    // detect changes  to refresh the component inside
    this.detect.detectChanges();

    this.dialogInstance.onAccept?.subscribe(data=> this.dialogRef.close(data));
    this.formInside=this.dialogInstance.formGroup;
    this.templateButtons=this.dialogInstance.templateButtons;  
      // detect to refresh these proterties   
    this.detect.detectChanges();

  }
 
}
