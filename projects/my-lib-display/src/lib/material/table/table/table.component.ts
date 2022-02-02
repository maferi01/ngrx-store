import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { ColInfoComponent } from '../col-info/col-info.component';
import { TableInfoComponent } from '../table-info/table-info.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnInit {
  @Input()
  dataSource: any;
  @Output()
  onClickRow= new EventEmitter();

  @ContentChild(TableInfoComponent)
  tableInfo!: TableInfoComponent;
  msort!: MatSort;
  @Output()
  onSort = new EventEmitter<Sort>();
  @Input()
  sortCurrent:Sort;
  @ViewChild(MatSort)
  set matSort(matSort: MatSort) {
    this.msort = matSort;
    this.msort.sortChange.subscribe((s) => {
    this.expandedElement=null;
    this.onSort.emit({
     direction:s.direction,
     active: this.tableInfo.colsInfo.find(c=> this.nameCol(c)===s.active)?.name as string
    })
  });    
  }
  expandedElement:any;
  constructor(private detect:ChangeDetectorRef) {}

  ngOnInit(): void {}

  get displayedColumns() {
    return this.tableInfo.colsInfo.map((c) => this.nameCol(c));
  }

  nameCol(inf: ColInfoComponent) {
    return `${inf.name}-${inf.typeCell}`;
  }

  nameColFromInfo(name:string):string{
    if(!name) return ''
    return this.nameCol(this.tableInfo.colsInfo.find(c=> c.name===name))
    
  }
  expand(row:any){
    this.onClickRow.emit(row);
    this.expandedElement=row;
  
  }
}
