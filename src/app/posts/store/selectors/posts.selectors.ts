import { createFeatureSelector, createSelector } from '@ngrx/store';
import { createSelectorLoading } from 'src/app/shared/store/loading/loading.selectors';
import { createSelectorsList } from 'src/app/shared/store/selectors.list';
import * as fromIndex from '../reducers';


export const selectPostsStateAll = createFeatureSelector<fromIndex.AppState>(
  fromIndex.postsStateFeatureKey
);


export const selectPostsState = createSelector(
  selectPostsStateAll,
  (state)=> state.posts
);

export const selectorsList= createSelectorsList(selectPostsState);

export const selectorLoadingPosts= createSelectorLoading('loadPost');