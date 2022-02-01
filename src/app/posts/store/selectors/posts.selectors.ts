import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FilterListInfo } from 'src/app/services/models/filter.model';
import * as fromPosts from '../reducers/posts.reducer';
import * as fromIndex from '../reducers';
import { StateList } from 'src/app/services/base/reducer.list';
import { createSelectorsList } from 'src/app/services/base/selectors.list';
import { createSelectorLoading } from 'src/app/store/selectors/loading.selectors';


export const selectPostsStateAll = createFeatureSelector<fromIndex.AppState>(
  fromIndex.postsStateFeatureKey
);


export const selectPostsState = createSelector(
  selectPostsStateAll,
  (state)=> state.posts
);

export const selectorsList= createSelectorsList(selectPostsState);

export const selectorLoadingPosts= createSelectorLoading('loadPost');