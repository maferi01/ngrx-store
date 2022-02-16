import { on } from '@ngrx/store';
import { createReducerList, StateList } from 'src/app/shared/store/reducer.list';
import { Comment } from '../../models/comment';
import * as CommentsActions from '../actions/comments.actions';

export const postsFeatureKey = 'posts';


export interface StateComments extends StateList<Comment>{
  extra:object;
}


export const initialState: StateComments = {
  extra:{
    data:'Hola'
  },
  data: [],
  loading:false,
  filterListInfo: {
    page: {
      pageSize: 4,
      pageIndex: 1
    }
  }
};




export const reducer = createReducerList(initialState,CommentsActions.loadComments,CommentsActions.loadCommentssSuccess,CommentsActions.loadCommentssFailure,
  on(CommentsActions.extraComments, (state:any, action) => ({...state,extra:action.data}))  
  );
  


// createReducer(
//   initialState,

//   on(CommentsActions.loadComments, state => ({...state,loading:true})),
//   on(CommentsActions.loadCommentssSuccess, (state, action) => ({...state,comments:[... action.data],filterListInfo:getFilterListInfo(action),loading:false})),
//   on(CommentsActions.loadCommentssFailure, (state, action) => state),

// );


