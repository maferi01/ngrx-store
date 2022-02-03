import { Action, createAction, props } from '@ngrx/store';

export type ErrorAction={
  error: any,
  general?:boolean
} ;

// export const loadErrors = createAction(
//   '[Error] Load Errors'
// );

export const loadErrorsFailure = createAction(
  '[Error] Load Errors Failure',
  props<{ error: any }>()
);

export const errorGeneral = createAction(
  '[Error] Error general',
  ({error}:ErrorAction)=> ({error,general:true}) 
);

export const errorHttp = createAction(
  '[Error] Error Http',
  ({error}:ErrorAction)=> ({error}) 
);

export const errorHandlerAngular = createAction(
  '[Error] Error Handler Angular',
  ({error}:ErrorAction)=> ({error}) 
);
