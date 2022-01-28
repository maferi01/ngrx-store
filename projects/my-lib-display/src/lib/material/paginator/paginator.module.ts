import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorComponent, TypeEventPagination } from './paginator/paginator.component';
import {MatIconModule} from '@angular/material/icon';
export {PaginatorComponent,TypeEventPagination};

@NgModule({
  declarations: [PaginatorComponent],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports:[PaginatorComponent]
})
export class PaginatorModule { }
