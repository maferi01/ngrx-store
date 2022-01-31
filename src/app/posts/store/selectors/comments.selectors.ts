import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FilterListInfo } from 'src/app/services/models/filter.model';
import * as fromComments from '../reducers/comments.reducer';
import * as fromIndex from '../reducers';


export const selectCommentsStateAll = createFeatureSelector<fromIndex.AppState>(
  fromIndex.postsStateFeatureKey
);


export const selectCommentsState = createSelector(
  selectCommentsStateAll,
  (state)=> state.comments
);

export const selectListComments = createSelector(
  selectCommentsState,
  (state:fromComments.State)=> state.comments
);


export const selectLoading = createSelector(
  selectCommentsState,
  (state:fromComments.State)=> state.loading
);

export const selectFilterListInfo = createSelector(
  selectCommentsState,
  (state:fromComments.State)=> state.filterListInfo
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
