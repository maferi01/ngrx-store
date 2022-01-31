import { Action, createReducer, on } from '@ngrx/store';
import { createReducerList, StateList } from 'src/app/services/base/reducer.list';
import { FilterListInfo, IResponseData, LoadInfoSuccces } from 'src/app/services/models/filter.model';
import { FilterPost, Post } from '../../models/models';
import * as PostsActions from '../actions/posts.actions';

export const postsFeatureKey = 'posts';

// export interface State {
//   posts: Post[];
//   loading: boolean;
//   filterListInfo: FilterListInfo<FilterPost>;
// }


export const initialState: StateList = {
  data: [],
  loading: false,
  filterListInfo: {
    page: {
      pageSize: 4,
      pageIndex: 1
    }
  }
};



export const reducer = createReducerList(initialState,PostsActions.loadPosts,PostsActions.loadPostssSuccess,PostsActions.loadPostssFailure)



