import { ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import { RootRoutingModule } from './root-routing.module';

import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './store/effects/app.effects';

import * as fromError from './store/reducers/error.reducer';
import { ErrorEffects } from './store/effects/error.effects';
import { GlobalErrorHandler } from './services/errorHandler';
import { PageErrorComponent } from './components/page-error/page-error.component';
import { MyLibDisplayModule } from 'my-lib-display';

@NgModule({
  declarations: [
    LayoutComponent,
    PageErrorComponent
  ],
  imports: [
    CommonModule,
    MyLibDisplayModule,    
    RootRoutingModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([AppEffects,ErrorEffects]),
    StoreModule.forFeature(fromError.errorFeatureKey, fromError.reducer),    
  ],
  providers: [{provide:ErrorHandler, useClass:GlobalErrorHandler}],
  exports:[LayoutComponent]
})
export class RootModule { }
