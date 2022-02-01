import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';

import * as LoadingActions from '../actions/loading.actions';



@Injectable()
export class LoadingEffects {

  // loadLoadings$ = createEffect(() => {
  //   return this.actions$.pipe( 

  //     ofType(LoadingActions.loadLoadings),
  //     concatMap(() =>
  //       /** An EMPTY observable only emits completion. Replace with your own observable API request */
  //       EMPTY.pipe(
  //         map(data => LoadingActions.loadLoadingsSuccess({ data })),
  //         catchError(error => of(LoadingActions.loadLoadingsFailure({ error }))))
  //     )
  //   );
  // });



  constructor(private actions$: Actions) {}

}
