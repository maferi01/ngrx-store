import { Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';
import { CellRenderDirective } from './cell-render.directive';


type TypeCell= 'normal' | 'extended' | 'tpl' ;

@Component({
  selector: 'col-info',
  templateUrl: './col-info.component.html',
  styleUrls: ['./col-info.component.scss']
})
export class ColInfoComponent implements OnInit {
  @Input()
  header!:string;

  @Input()
  name!:string;

  @Input()
  sort:boolean=false;
  

  @Input()
  typeCell:TypeCell='normal';

  
  @ContentChild(CellRenderDirective,{read: TemplateRef})
  cellRender!:TemplateRef<any>; 


  constructor() { }

  ngOnInit(): void {
  }

}
