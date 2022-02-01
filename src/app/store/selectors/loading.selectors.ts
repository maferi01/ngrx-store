import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromLoading from '../reducers/loading.reducer';

export const selectLoadingState = createFeatureSelector<fromLoading.State>(
  fromLoading.loadingFeatureKey
);

export function createSelectorLoading(idGroupLoading?: string,   idLoading?: string){
  return createSelector(
    selectLoadingState,
    (state)=> state.stack.filter(l=> l.idGroupLoading===idGroupLoading && ( !idLoading || l.idLoading===idLoading)).length>0
  )
}

