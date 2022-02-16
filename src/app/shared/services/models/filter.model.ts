
import {z} from 'zod';


const xsdSortInfo = z.object({ direction: z.union([z.literal('asc'),z.literal('desc')])  , active: z.string() });

const xsdPageRequest = z.object({
  requestLink: z.string().optional(),
  pageIndex: z.number().optional(), pageSize: z.number().optional() });

export const xsdLoadInfoSuccess = z.object({
  data: z.array(
    z.any()
  ),
  link: z.string(),
  filter: (z.any()),
  sortInfo: xsdSortInfo.optional(),
  pageRequest: xsdPageRequest,
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
    linkNext: string|null|undefined;
    linkPrev: string|null|undefined ;
    linkLast: string|null|undefined;
    linkFisrt: string|null|undefined;
  };
}

export type SortInfo= z.infer<typeof xsdSortInfo>;

export type PageRequest= z.infer<typeof xsdPageRequest>;

// export interface ResultList<E> {
//   rows: E[];
//   pageInfo: PageInfo;
// }

export interface FilterListInfo<F = any> {
  filter?: F;
  order?: SortInfo;
  page?: PageInfo;
}


export type IResponseData<T=any> = { link: string | undefined | null; data: T[] };

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
    