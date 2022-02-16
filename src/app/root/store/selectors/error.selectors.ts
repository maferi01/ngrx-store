import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromError from '../reducers/error.reducer';

export const selectErrorState = createFeatureSelector<fromError.StateError>(
  fromError.errorFeatureKey
);


export const selectError= createSelector(
  selectErrorState,
  (state)=> state.error )