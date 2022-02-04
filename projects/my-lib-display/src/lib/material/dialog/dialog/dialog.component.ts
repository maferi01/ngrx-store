import { ComponentType } from '@angular/cdk/portal';
import { ChangeDetectorRef, Component, ComponentRef, EventEmitter, Injector, Input, OnInit, Output, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AbstractDialogComponent } from '../dialog.module';

@Component({
  selector: 'lib-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  @Input() filters: any;
  submitEmit: EventEmitter<any> = new EventEmitter();

  @Input() title: string;
  @Output() accept: EventEmitter<object>=new EventEmitter();

  @ViewChild('dialogInside',{read:ViewContainerRef})
  viewContainerInside:ViewContainerRef;

  
  dialogRef: MatDialogRef<any, any>;
  dataDialog: {
    compInsideDialog: ComponentType<any>
  };
  detect: ChangeDetectorRef;
  compInside: ComponentRef<AbstractDialogComponent>;
  formInside:FormGroup;
  templateButtons:TemplateRef<any>;

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
    // detect changes  to refresh the component inside
    this.detect.detectChanges();

    this.compInside.instance.onAccept.subscribe(data=> this.dialogRef.close(data));
    console.log('Form comp inside---------',this.compInside.instance.formComponent);
    this.formInside=this.compInside.instance?.formComponent?.group;
    this.templateButtons=this.compInside.instance?.templateButtons;
    // detect to refresh these proterties   
    this.detect.detectChanges();

  }
 
}
