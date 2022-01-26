import { AfterContentInit, ChangeDetectorRef, Component, ContentChildren, OnInit, QueryList } from '@angular/core';
import { setDelay } from '../../form/components/utils';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit,AfterContentInit {
   
  @ContentChildren(TabComponent)
  tabsList!:QueryList<TabComponent>;

  tabSelected!:TabComponent;

  constructor(private detect:ChangeDetectorRef) { }
  ngAfterContentInit(): void {
 
  setDelay (()=>this.selectTab(this.tabs[0].name))
//  this.detect.detectChanges();
  }

  ngOnInit(): void {
  }



 get tabs(){
   return this.tabsList?.toArray()
 }

selectTab(name:string){
  this.tabSelected= this.tabs.find(t=>t.name===name) as TabComponent;
}

}
