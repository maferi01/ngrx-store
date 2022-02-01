import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StateList } from 'src/app/services/base/reducer.list';
import { createSelectorsList } from 'src/app/services/base/selectors.list';
import { FilterListInfo } from 'src/app/services/models/filter.model';
import { createSelectorLoading } from 'src/app/store/selectors/loading.selectors';
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