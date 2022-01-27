import { Component, ContentChild, ContentChildren, OnInit, QueryList, TemplateRef } from '@angular/core';
import { ColInfoComponent } from '../col-info/col-info.component';
import { RowDetailDirective } from './row-detail.directive';

@Component({
  selector: 'table-info',
  templateUrl: './table-info.component.html',
  styleUrls: ['./table-info.component.scss']
})
export class TableInfoComponent implements OnInit {

  @ContentChildren(ColInfoComponent)
  colsInfoComp!:QueryList<ColInfoComponent> ; 
  @ContentChild(RowDetailDirective,{read: TemplateRef})
  rowDetailTpl!:TemplateRef<any>; 

  constructor() { }

  ngOnInit(): void {
  }

  get colsInfo(){
    return this.colsInfoComp.toArray();
  }
}
