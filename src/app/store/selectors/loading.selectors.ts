import { createFeatureSelector, createSelector } from '@ngrx/store';
import {   filter, map, Observable } from 'rxjs';
import * as fromLoading from '../reducers/loading.reducer';
import { LoadingInfo } from '../reducers/loading.reducer';

export const selectLoadingState = createFeatureSelector<fromLoading.State>(
  fromLoading.loadingFeatureKey
);

export function createSelectorLoading(idGroupLoading?: string,   idLoading?: string){
  return createSelector(
    selectLoadingState,
    (state)=> state.stack.filter(l=> l.idGroupLoading===idGroupLoading && ( idLoading===undefined || l.idLoading===idLoading)).length>0
  )
}

export function createSelectorLoadingGroup(idGroupLoading?: string){
  return createSelector(
    selectLoadingState,
    (state)=> state.stack.filter(l=> l.idGroupLoading===idGroupLoading)  )
}


export function filterLoadingId(obsLoading:Observable<LoadingInfo[]>,idLoading: string ):Observable<boolean>{
  return obsLoading.pipe(
    map(l=> l.filter(s=> s.idLoading===idLoading).length>0)
  )
}





