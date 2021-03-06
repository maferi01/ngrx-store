import { createFeatureSelector, createSelector } from '@ngrx/store';
import { createSelectorsList } from 'src/app/shared/store/list/selectors.list';
import { createSelectorLoading, createSelectorLoadingGroup } from 'src/app/shared/store/loading/loading.selectors';
import * as fromIndex from '../reducers';


export const selectCommentsStateAll = createFeatureSelector<fromIndex.AppState>(
  fromIndex.postsStateFeatureKey
);


export const selectCommentsState = createSelector(
  selectCommentsStateAll,
  (state)=> state.comments
);

export const selectorsList= createSelectorsList(selectCommentsState);

export const selectorLoadingComments= createSelectorLoading('loadComments');

export const selectorLoadingQuery=createSelectorLoadingGroup('querytest')