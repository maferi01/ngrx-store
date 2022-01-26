import { Component, ContentChild, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit {
  @Input()
  name!:string;

  @Input()
  value!:string;

  @ContentChild(TemplateRef)
  tplTabContainer!:TemplateRef<any>;

  @ViewChild('refTab')
  tplTab!:TemplateRef<any>;
  
  @ViewChild('refTab2')
  tplTab2!:TemplateRef<any>;

  constructor() { }

  ngOnInit(): void {
  }

}
