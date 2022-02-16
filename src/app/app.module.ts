import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LayoutComponent } from './root/components/layout/layout.component';
import { RootModule } from './root/root.module';


@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    RootModule
    
  ],
  bootstrap: [LayoutComponent]
})
export class AppModule { }
