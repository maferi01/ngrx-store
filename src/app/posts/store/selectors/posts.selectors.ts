import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FilterListInfo } from 'src/app/services/models/filter.model';
import * as fromPosts from '../reducers/posts.reducer';
import * as fromIndex from '../reducers';


export const selectPostsStateAll = createFeatureSelector<fromIndex.AppState>(
  fromIndex.postsStateFeatureKey
);


export const selectPostsState = createSelector(
  selectPostsStateAll,
  (state)=> state.posts
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
        requestLink: undefined as any,
        pageIndex: state?.page?.pageIndex,
        pageSize: state?.page?.pageSize
      },
      sortInfo:state?.order, 
      filter:state?.filter,
    }
  )
);



export const selectLinksStatus = createSelector(
  selectFilterListInfo,
  (state:FilterListInfo)=> (
    {
      first: !!state.page?.linkInfo?.linkFisrt,
      next: !!state.page?.linkInfo?.linkNext,
      prev: !!state.page?.linkInfo?.linkPrev,
      last: !!state.page?.linkInfo?.linkLast,
    }
  )
);


export const selectFilter = createSelector(
  selectFilterListInfo,
  (filterList:FilterListInfo)=> filterList?.filter
);

export const selectSort = createSelector(
  selectFilterListInfo,
  (filterList:FilterListInfo)=> ({...filterList.order})
);
