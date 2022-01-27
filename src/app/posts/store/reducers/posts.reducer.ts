import { Action, createReducer, on } from '@ngrx/store';
import { Post } from '../../models/models';
import * as PostsActions from '../actions/posts.actions';

export const postsFeatureKey = 'posts';

export interface State {
  posts: Post[]
}

export const initialState: State = {
  posts: []
};

export const reducer = createReducer(
  initialState,

  on(PostsActions.loadPostss, state => state),
  on(PostsActions.loadPostssSuccess, (state, action) => ({...state,posts:[... action.data]})),
  on(PostsActions.loadPostssFailure, (state, action) => state),

);
