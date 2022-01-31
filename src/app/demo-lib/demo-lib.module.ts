import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComplexFieldsModule, FieldsModule, FormModule, MaterialFieldsModule, TableModule, TabsModule } from 'my-lib-display';
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
     ComplexFieldsModule
   // BrowserAnimationsModule
  ]
})
export class DemoLibModule { }
