import { createAction, props } from '@ngrx/store';
import { FilterList } from 'src/app/services/models/filter.model';
import { FilterPost, Post } from '../../models/models';

export const loadInitPosts = createAction(
  '[Posts] Load Init Posts'
);

export const loadPostssSuccess = createAction(
  '[Posts] Load Postss Success',
  props<{ data: Post[] }>()
);

export const loadPostssFailure = createAction(
  '[Posts] Load Postss Failure',
  props<{ error: any }>()
);

export const loadPosts = createAction(
  '[Posts] Load Postss',
  props<{ filterList?: FilterList<FilterPost> }>() 
);

export const filterPosts = createAction(
  '[Posts] Filter Posts',
  props<{filter:FilterPost}>()
);