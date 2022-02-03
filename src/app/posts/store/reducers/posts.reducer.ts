import { createReducerList, StateList } from 'src/app/services/base/reducer.list';
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



