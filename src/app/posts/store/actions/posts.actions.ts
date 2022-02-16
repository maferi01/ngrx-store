import { ActionCreator, createAction, props } from '@ngrx/store';
import { FunctionWithParametersType, TypedAction } from '@ngrx/store/src/models';
import { TypeEventPagination } from 'my-lib-display';
import { LoadInfo, LoadInfoSuccces, SortInfo } from 'src/app/shared/store/filter.list.model';
import { FilterPost, Post } from '../../models/models';


 type MyAction=ActionCreator<any,()=>TypedAction<any>>;
 type MyActionExact=ActionCreator<any,(props:any)=>any & TypedAction<any>>; 
 type MyActinFn= FunctionWithParametersType<[any],any & TypedAction<any> & TypedAction<any> >

export const loadInitPosts:MyAction = createAction(
  '[Posts] Load Init Posts'
);

export const loadPostssSuccess:MyActionExact = createAction(
  '[Posts] Load Postss Success',
 // props<{ data: Post[],link:string,filter:FilterPost,sortInfo:SortInfo,pageRequest:PageRequest }>()
 props<LoadInfoSuccces<FilterPost,Post>>()
);

export const loadPostssFailure = createAction(
  '[Posts] Load Postss Failure',
  props<{ error: any }>()
);

export const loadPosts = createAction(
  '[Posts] Load Postss', 
  (data:LoadInfo<FilterPost>)=>({...data,SHOW_LOADING: 'SHOW_LOADING'})  
)



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