import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Post } from '../../models/models';
import * as fromPosts from '../reducers/posts.reducer';

export const selectPostsState = createFeatureSelector<fromPosts.State>(
  fromPosts.postsFeatureKey
);


export const selectListPosts = createSelector(
  selectPostsState,
  (state:fromPosts.State)=> state.posts
);


export const selectLoading = createSelector(
  selectPostsState,
  (state:fromPosts.State)=> state.loading
);
