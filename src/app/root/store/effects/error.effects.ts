import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, filter, tap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';

import * as ErrorActions from '../actions/error.actions';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';



@Injectable()
export class ErrorEffects {

  convertErrors$ = createEffect(() => {
    return this.actions$.pipe( 
      filter((action:any)=> !!action.error && !action.general),
      concatMap((action:ErrorActions.ErrorAction & Action) =>
        of(action).pipe(
          map(action => ErrorActions.errorGeneral({error:action.error})),
          )
      )
    );
  });

  // handle error general
  generaErrors$ = createEffect(() => {
    return this.actions$.pipe( 
      ofType(ErrorActions.errorGeneral),
      concatMap((action) =>
        of(action).pipe(
          tap(action=> {
            // handle error,
            // or propagate error handle error Angular ,throw action.error
             this.router.navigate(['error'])
          }),
          //catchError(error => of(ErrorActions.loadErrorsFailure({ error }))
          )
      )
    );
  }, { dispatch: false });




  constructor(private actions$: Actions,private router:Router) {}

}
