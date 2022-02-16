import { createSelector } from "@ngrx/store";
import { FilterListInfo } from "./filter.list.model";
import { StateList } from "./reducer.list";


export function createSelectorsList(selectListState:any){
      const selectListData = createSelector(
        selectListState,
        (state:StateList)=> state.data
      )
      const selectLoading = createSelector(
        selectListState,
        (state:StateList)=> state.loading
      )
      const selectFilterListInfo = createSelector(
        selectListState,
        (state:StateList)=> state.filterListInfo
      )
      const selectFilterListRequest = createSelector(
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
      )
      const selectLinksStatus = createSelector(
        selectFilterListInfo,
        (state:FilterListInfo)=> (
          {
            first: !!state?.page?.linkInfo?.linkFisrt,
            next: !!state?.page?.linkInfo?.linkNext,
            prev: !!state?.page?.linkInfo?.linkPrev,
            last: !!state?.page?.linkInfo?.linkLast,
          }
        )
      )
      const selectFilter = createSelector(
        selectFilterListInfo,
        (filterList:FilterListInfo)=> filterList?.filter
      )
      const selectSort = createSelector(
        selectFilterListInfo,
        (filterList:FilterListInfo)=> ({...filterList?.order})
      )
    return {
        selectListData,selectLoading,selectFilterListInfo,selectFilterListRequest,selectLinksStatus, selectFilter,selectSort
    }
  } 
  
  