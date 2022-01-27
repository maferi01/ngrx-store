import { createAction, props } from '@ngrx/store';
import { Post } from '../../models/models';

export const loadPostss = createAction(
  '[Posts] Load Postss'
);

export const loadPostssSuccess = createAction(
  '[Posts] Load Postss Success',
  props<{ data: Post[] }>()
);

export const loadPostssFailure = createAction(
  '[Posts] Load Postss Failure',
  props<{ error: any }>()
);
