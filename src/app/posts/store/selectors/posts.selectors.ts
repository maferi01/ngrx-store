import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FilterListInfo } from 'src/app/services/models/filter.model';
import { Post } from '../../models/models';
import * as fromPosts from '../reducers/posts.reducer';

export const selectPostsState = createFeatureSelector<fromPosts.State>(
  fromPosts.postsFeatureKey
);


export const selectListPosts = createSelector(
  selectPostsState,
  (state:fromPosts.State)=> state.posts
);


export const selectLoading = createSelector(
  selectPostsState,
  (state:fromPosts.State)=> state.loading
);

export const selectFilterListInfo = createSelector(
  selectPostsState,
  (state:fromPosts.State)=> state.filterListInfo
);

export const selectFilterListRequest = createSelector(
  selectFilterListInfo,
  (state:FilterListInfo)=> (
    {
      pageRequest: {
        requestLink: state?.page?.requestLink,
        pageIndex: state?.page?.pageIndex,
        pageSize: state?.page?.pageSize
      },
      sortInfo:state?.order, 
      filterPost:state?.filter,
    }
  )
);

export const selectFilter = createSelector(
  selectFilterListInfo,
  (filterList:FilterListInfo)=> filterList?.filter
);
