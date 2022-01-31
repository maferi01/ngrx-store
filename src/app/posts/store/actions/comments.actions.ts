import { Action, createAction, props } from '@ngrx/store';
import { TypeEventPagination } from 'my-lib-display';
import { FilterListInfo, LoadInfo, PageRequest, SortInfo } from 'src/app/services/models/filter.model';
import { FilterComment,Comment } from '../../models/comment';




export const loadInitComments = createAction(
  '[Comments] Load Init Comments'
);

export const loadCommentssSuccess = createAction(
  '[Comments] Load Commentss Success',
  props<{ data: Comment[],link:string,filter:FilterComment,sortInfo:SortInfo,pageRequest:PageRequest }>()
);

export const loadCommentssFailure = createAction(
  '[Comments] Load Commentss Failure',
  props<{ error: any }>()             
);

export const loadComments = createAction(
  '[Comments] Load Commentss', 
  (data:LoadInfo<FilterComment>)=>({...data,SHOW_LOADING: 'SHOW_LOADING'})  
)

export const filterComments = createAction(
  '[Comments] Filter Comments',
  props<{filter:FilterComment}>()
);

export const paginationComments = createAction(
  '[Comments] Pagination Comments',
  props<{typeEventPagination :TypeEventPagination}>()
);




export const sortComments = createAction(
  '[Comments] Sort Comments',
  props<{sortInfo: SortInfo}>()
);