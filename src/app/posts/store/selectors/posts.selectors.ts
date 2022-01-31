import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FilterListInfo } from 'src/app/services/models/filter.model';
import * as fromPosts from '../reducers/posts.reducer';
import * as fromIndex from '../reducers';
import { StateList } from 'src/app/services/base/reducer.list';
import { createSelectorsList } from 'src/app/services/base/selectors.list';


export const selectPostsStateAll = createFeatureSelector<fromIndex.AppState>(
  fromIndex.postsStateFeatureKey
);


export const selectPostsState = createSelector(
  selectPostsStateAll,
  (state)=> state.posts
);

export const selectorsList= createSelectorsList(selectPostsState);

// export const selectListPosts = createSelector(
//   selectPostsState,
//   (state:StateList)=> state.data
// );


// export const selectLoading = createSelector(
//   selectPostsState,
//   (state:StateList)=> state.loading
// );

// export const selectFilterListInfo = createSelector(
//   selectPostsState,
//   (state:StateList)=> state.filterListInfo
// );

// export const selectFilterListRequest = createSelector(
//   selectFilterListInfo,
//   (state:FilterListInfo)=> (
//     {
//       pageRequest: {
//         requestLink: undefined as any,
//         pageIndex: state?.page?.pageIndex,
//         pageSize: state?.page?.pageSize
//       },
//       sortInfo:state?.order, 
//       filter:state?.filter,
//     }
//   )
// );



// export const selectLinksStatus = createSelector(
//   selectFilterListInfo,
//   (state:FilterListInfo)=> (
//     {
//       first: !!state.page?.linkInfo?.linkFisrt,
//       next: !!state.page?.linkInfo?.linkNext,
//       prev: !!state.page?.linkInfo?.linkPrev,
//       last: !!state.page?.linkInfo?.linkLast,
//     }
//   )
// );


// export const selectFilter = createSelector(
//   selectFilterListInfo,
//   (filterList:FilterListInfo)=> filterList?.filter
// );

// export const selectSort = createSelector(
//   selectFilterListInfo,
//   (filterList:FilterListInfo)=> ({...filterList.order})
// );
