
import {z} from 'zod';


export const xsdLoadInfoSuccess = z.object({
  data: z.array(
    z.any()
  ),
  link: z.string(),
  filter: (z.any()),
  sortInfo: z.object({ direction: z.string(), active: z.string() }).optional(),
  pageRequest: z.object({ pageIndex: z.number(), pageSize: z.number() }),
  type: z.string().optional(),
});


export interface PageInfo {
  /** The current page index. */
  pageIndex?: number;
  /**
   * Index of the page that was selected previously.
   * @breaking-change 8.0.0 To be made into a required property.
   */
  previousPageIndex?: number;
  /** The current page size */
  pageSize?: number;
  /** The current total number of items being paged */
  length?: number;
}

export interface PageInfo {
  requestLink?: string;
  linkInfo?: {
    linkNext: string;
    linkPrev: string;
    linkLast: string;
    linkFisrt: string;
  };
}

export interface SortInfo {
  /** The id of the column being sorted. */
  active: string;
  /** The sort direction. */
  direction: 'asc' | 'desc' | '';
}

export interface PageRequest {
  requestLink:string;
  pageIndex?: number;
  /** The current page size */
  pageSize?: number;     
}



// export interface ResultList<E> {
//   rows: E[];
//   pageInfo: PageInfo;
// }

export interface FilterListInfo<F = any> {
  filter?: F;
  order?: SortInfo;
  page?: PageInfo;
}

//export const OPTIONS_STATE_LIST = new InjectionToken<StateOptions>('options_state_list');

// export interface StateListFilter<D,E=any> {
//   ui: {
//     expandFilter?: boolean;
//   };
//   filterList: FilterListInfo;
//   selectionRows?:E[];
//   extraData: D;
// }

export type IResponseData<T=any> = { link: string; data: T[] };

export interface LoadInfo<T=any>{
  filter:T,
  sortInfo:SortInfo,
  pageRequest:PageRequest}

  
 export interface LoadInfoSuccces<F=any,T=any> extends LoadInfo<F>,IResponseData<T>{
    }
  

    export interface ISelectorsList
      {
        selectListData:any,selectLoading:any,selectFilterListInfo:any,selectFilterListRequest:any,selectLinksStatus:any, selectFilter:any,selectSort:any
    }
    