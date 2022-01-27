import { Action, createReducer, on } from '@ngrx/store';
import { Post } from '../../models/models';
import * as PostsActions from '../actions/posts.actions';

export const postsFeatureKey = 'posts';

export interface State {
  posts: Post[],
  loading:boolean;
}

export const initialState: State = {
  posts: [],
  loading:false
};

export const reducer = createReducer(
  initialState,

  on(PostsActions.loadPostss, state => ({...state,loading:true})),
  on(PostsActions.loadPostssSuccess, (state, action) => ({...state,posts:[... action.data],loading:false})),
  on(PostsActions.loadPostssFailure, (state, action) => state),

);
