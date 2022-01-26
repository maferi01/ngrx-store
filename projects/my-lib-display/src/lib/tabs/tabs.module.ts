import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabComponent } from './tab/tab.component';
import { TabsComponent } from './tabs/tabs.component';

export { TabComponent,
  TabsComponent};

@NgModule({
  declarations: [
    TabComponent,
    TabsComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    TabComponent,
    TabsComponent
  ]
})
export class TabsModule { }
