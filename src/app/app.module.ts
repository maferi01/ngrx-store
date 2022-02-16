import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MyLibDisplayModule } from 'my-lib-display';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './store/effects/app.effects';
import { HttpClientModule } from '@angular/common/http';
import * as fromError from './store/reducers/error.reducer';
import { ErrorEffects } from './store/effects/error.effects';
import { PageErrorComponent } from './page-error/page-error.component';
import { GlobalErrorHandler } from './shared/services/errorHandler';


@NgModule({
  declarations: [
    AppComponent,
    PageErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MyLibDisplayModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([AppEffects,ErrorEffects]),
    StoreModule.forFeature(fromError.errorFeatureKey, fromError.reducer),    
    
  ],
  providers: [{provide:ErrorHandler, useClass:GlobalErrorHandler}],
  bootstrap: [AppComponent]
})
export class AppModule { }
