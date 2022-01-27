import { Action, createReducer, on } from '@ngrx/store';
import { FilterList } from 'src/app/services/models/filter.model';
import { FilterPost, Post } from '../../models/models';
import * as PostsActions from '../actions/posts.actions';

export const postsFeatureKey = 'posts';

export interface State {
  posts: Post[];
  loading:boolean;
  filterList:FilterList<FilterPost>;
}

export const initialState: State = {
  posts: [],
  loading:false,
  filterList: undefined
};

export const reducer = createReducer(
  initialState,

  on(PostsActions.loadPosts, state => ({...state,loading:true})),
  on(PostsActions.loadPostssSuccess, (state, action) => ({...state,posts:[... action.data],filterList:action.filterList,loading:false})),
  on(PostsActions.loadPostssFailure, (state, action) => state),

);
