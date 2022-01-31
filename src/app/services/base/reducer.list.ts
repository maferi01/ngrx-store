import { createReducer, on } from "@ngrx/store";
import { FilterListInfo, LoadInfoSuccces } from "../models/filter.model";



export interface StateList<T =any> {
    data: T[];
    loading:boolean;
    filterListInfo:FilterListInfo;
  }


function getFilterListInfo(action: LoadInfoSuccces): FilterListInfo {
    return {
      filter: action.filter,
      order: action.sortInfo,
      page: {
        pageIndex: action.pageRequest.pageIndex, 
        pageSize: action.pageRequest.pageSize,
        requestLink: action.pageRequest.requestLink,
        linkInfo: {
          linkFisrt: getUrlLink(action.link, 'first'),
          linkNext: getUrlLink(action.link, 'next'),
          linkLast: getUrlLink(action.link, 'last'),
          linkPrev: getUrlLink(action.link, 'prev'),
        }
      }
    }
  }
  
  /**
   *
   * @param link Helper to get partial url
   * @param arg1
   */
   function getUrlLink(link: string, key: string): string {
    let url;
    if (!link) {
      return null;
    }
    link.split(',').forEach((cad) => {
      if (cad.split(';')[1].includes(`rel="${key}"`)) {
        url = cad.split(';')[0].replace('<', '').replace('>', '').trim();
      }
    });
    return url;
  }
  


export function createReducerList<T extends StateList>(initS:T,loadAction:any,loadSuccess:any,loadFailure:any){
    return createReducer(
      initS,  
      on(loadAction, state => ({...state,loading:true})),
      on(loadSuccess, (state, action:LoadInfoSuccces) => ({...state,data:[... action.data],filterListInfo:getFilterListInfo(action),loading:false})),
      on(loadFailure, (state, action) => state),
    
    );
  }


  