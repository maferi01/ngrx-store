import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FieldsModule, FormModule, MaterialFieldsModule, TableModule, TabsModule } from 'my-lib-display';
import { AppComponentDemo } from './app.component';
import { DemoLibRoutingModule } from './demo-lib-routing.module';



@NgModule({
  declarations: [AppComponentDemo],
  imports: [
    CommonModule,
    DemoLibRoutingModule,
    FormModule,
    FieldsModule,
     TableModule,
     TabsModule,
     MaterialFieldsModule,
   // BrowserAnimationsModule
  ]
})
export class DemoLibModule { }
