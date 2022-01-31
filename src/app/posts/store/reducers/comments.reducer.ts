import { Action, createReducer, on } from '@ngrx/store';
import { FilterListInfo } from 'src/app/services/models/filter.model';
import { Comment, FilterComment } from '../../models/comment';
import * as CommentsActions from '../actions/comments.actions';

export const postsFeatureKey = 'posts';

export interface State {
  comments: Comment[];
  loading:boolean;
  filterListInfo:FilterListInfo<FilterComment>;
}


export const initialState: State = {
  comments: [],
  loading:false,
  filterListInfo: {
    page: {
      pageSize: 4,
      pageIndex: 1
    }
  }
};


export const reducer = createReducer(
  initialState,

  on(CommentsActions.loadComments, state => ({...state,loading:true})),
  on(CommentsActions.loadCommentssSuccess, (state, action) => ({...state,comments:[... action.data],filterListInfo:{
    filter: action.filter,
    order: action.sortInfo,
    page : {
      pageIndex: action.pageRequest.pageIndex,
      pageSize: action.pageRequest.pageSize,
      requestLink: action.pageRequest.requestLink,
      linkInfo: {
        linkFisrt: getUrlLink(action.link, 'first'),
        linkNext: getUrlLink(action.link, 'next'),
        linkLast: getUrlLink(action.link, 'last'),
        linkPrev: getUrlLink(action.link, 'prev'),
      }
    }
  },loading:false})),
  on(CommentsActions.loadCommentssFailure, (state, action) => state),

);

/**
 *
 * @param link Helper to get partial url
 * @param arg1
 */
 function getUrlLink(link: string, key: string): string {
  let url;
  if (!link) {
    return null;
  }
  link.split(',').forEach((cad) => {
    if (cad.split(';')[1].includes(`rel="${key}"`)) {
      url = cad.split(';')[0].replace('<', '').replace('>', '').trim();
    }
  });
  return url;
}
