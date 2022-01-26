import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyLibDisplayComponent } from './my-lib-display.component';



@NgModule({
  declarations: [
    MyLibDisplayComponent
  ],
  imports: [
    BrowserAnimationsModule,
  ],
  exports: [
    MyLibDisplayComponent
    
  ]
})
export class MyLibDisplayModule { }
