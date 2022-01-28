import { createAction, props } from '@ngrx/store';
import { TypeEventPagination } from 'my-lib-display';
import { FilterListInfo, PageRequest, SortInfo } from 'src/app/services/models/filter.model';
import { FilterPost, Post } from '../../models/models';

export const loadInitPosts = createAction(
  '[Posts] Load Init Posts'
);

export const loadPostssSuccess = createAction(
  '[Posts] Load Postss Success',
  props<{ data: Post[],link:string,filterPost:FilterPost,sortInfo:SortInfo,pageRequest:PageRequest }>()
);

export const loadPostssFailure = createAction(
  '[Posts] Load Postss Failure',
  props<{ error: any }>()
);

export const loadPosts = createAction(
  '[Posts] Load Postss',
  props<{filterPost:FilterPost,sortInfo:SortInfo,pageRequest:PageRequest}>() 
);

export const filterPosts = createAction(
  '[Posts] Filter Posts',
  props<{filter:FilterPost}>()
);

export const paginationPosts = createAction(
  '[Posts] Pagination Posts',
  props<{typeEventPagination :TypeEventPagination}>()
);

export const sortPosts = createAction(
  '[Posts] Sort Posts',
  props<{sortInfo: SortInfo}>()
);