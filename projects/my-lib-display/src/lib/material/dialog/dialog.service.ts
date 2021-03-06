import { Injectable, ViewContainerRef, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { AbstractDialogComponent } from './abstract-dialog/abstract-dialog.component';
import { last, Observable } from 'rxjs';
import { DialogComponent } from './dialog/dialog.component';

@Injectable()
export class DialogService {
  constructor(public dialog: MatDialog) {}

  openDialog<T extends AbstractDialogComponent, S>(
    compInsideDialog : ComponentType<T>,
    data?: object,
    fnComp?:(compInside: ComponentRef<any>,dialogRef:MatDialogRef<any,any>)=>void,
    compDialog: ComponentType<any>= DialogComponent,
    viewContainerRef?: ViewContainerRef,
    //componentFactoryResolver?: ComponentFactoryResolver
  ): Observable<S> {
    
    const dialogRef = this.dialog.open(compDialog, {
      data:{
        compInsideDialog,
        data
      },
      viewContainerRef      
    });
    //fnComp((dialogRef.componentInstance) as DialogComponent).compInside) as  ComponentRef<any>);

    const dialogComp:DialogComponent= dialogRef.componentInstance as DialogComponent;
    
    dialogRef.afterOpened().pipe(last()).
    subscribe(()=> fnComp && fnComp(dialogComp.compInside as ComponentRef<T>,dialogRef)
    )

    return dialogRef.afterClosed();
    //dialogRef.componentInstance.data
    // dialogRef.afterClosed().subscribe((result) => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }


  // openDialogRef<T extends AbstractDialogComponent, S>(
  //   compDialog: ComponentType<T>,
  //   data?: object,
  //   viewContainerRef?: ViewContainerRef,
  //   componentFactoryResolver?: ComponentFactoryResolver
  // ): MatDialogRef<T>{
  //   const dialogRef = this.dialog.open(compDialog, {
  //     data,
  //     viewContainerRef,
  //     componentFactoryResolver,
  //   });
  //   return dialogRef;
  //   //dialogRef.componentInstance.data
  //   // dialogRef.afterClosed().subscribe((result) => {
  //   //   console.log(`Dialog result: ${result}`);
  //   // });
  // }
}
