import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { DialogComponent } from './dialog/dialog.component';
import { DialogService } from './dialog.service';
import { AbstractDialogComponent } from './abstract-dialog/abstract-dialog.component';

export {DialogService, AbstractDialogComponent};

@NgModule({
  declarations: [
    DialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule
  ],
  providers:[DialogService]
})
export class DialogModule { }
