import { Action, createReducer, on } from '@ngrx/store';
import { FilterListInfo, IResponseData, LoadInfoSuccces } from 'src/app/services/models/filter.model';
import { FilterPost, Post } from '../../models/models';
import * as PostsActions from '../actions/posts.actions';

export const postsFeatureKey = 'posts';

export interface State {
  posts: Post[];
  loading: boolean;
  filterListInfo: FilterListInfo<FilterPost>;
}


export const initialState: State = {
  posts: [],
  loading: false,
  filterListInfo: {
    page: {
      pageSize: 4,
      pageIndex: 1
    }
  }
};


export const reducer = createReducer(
  initialState,

  on(PostsActions.loadPosts, state => ({ ...state, loading: true })),
  on(PostsActions.loadPostssSuccess, (state, action) => ({ ...state, posts: [...action.data], filterListInfo: getFilterListInfo(action), loading: false })),
  on(PostsActions.loadPostssFailure, (state, action) => state),

);

function getFilterListInfo(action: LoadInfoSuccces<FilterPost,Post>): FilterListInfo<FilterPost> {
  return {
    filter: action.filter,
    order: action.sortInfo,
    page: {
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
  }
}

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
