import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MyLibDisplayModule } from 'my-lib-display';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MyLibDisplayModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
