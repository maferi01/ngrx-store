import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { TableComponent } from './table/table.component';
import { TableInfoComponent } from './table-info/table-info.component';
import { ColInfoComponent } from './col-info/col-info.component';
import { CellRenderDirective } from './col-info/cell-render.directive';
import { MatSortModule } from '@angular/material/sort';
import { RowDetailDirective } from './table-info/row-detail.directive';


export {TableComponent,TableInfoComponent,
  ColInfoComponent,CellRenderDirective,RowDetailDirective};

@NgModule({
  declarations: [
    TableComponent,
    TableInfoComponent,
    ColInfoComponent,
    CellRenderDirective,
    RowDetailDirective
  ],
  imports: [
    CommonModule,
    MatSortModule,
    MatTableModule
  ],
  exports:[TableComponent,TableInfoComponent,
    ColInfoComponent,CellRenderDirective,RowDetailDirective]
})
export class TableModule { }
