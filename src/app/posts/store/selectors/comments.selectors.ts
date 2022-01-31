import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StateList } from 'src/app/services/base/reducer.list';
import { createSelectorsList } from 'src/app/services/base/selectors.list';
import { FilterListInfo } from 'src/app/services/models/filter.model';
import * as fromIndex from '../reducers';


export const selectCommentsStateAll = createFeatureSelector<fromIndex.AppState>(
  fromIndex.postsStateFeatureKey
);


export const selectCommentsState = createSelector(
  selectCommentsStateAll,
  (state)=> state.comments
);

export const selectorsList= createSelectorsList(selectCommentsState);

// export const selectListComments = createSelector(
//   selectCommentsState,
//   (state:StateList)=> state.data
// );


// export const selectLoading = createSelector(
//   selectCommentsState,
//   (state:StateList)=> state.loading
// );

// export const selectFilterListInfo = createSelector(
//   selectCommentsState,
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
