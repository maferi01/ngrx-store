import { state } from '@angular/animations';
import { Action, createReducer, on } from '@ngrx/store';
import * as ErrorActions from '../actions/error.actions';

export const errorFeatureKey = 'error';

export interface StateError {
  error?: any;
}

export const initialState: StateError = {
  
};

export const reducer = createReducer(
  initialState,
  on(ErrorActions.errorGeneral, (state, {error}) => ({...state,error })),
);
