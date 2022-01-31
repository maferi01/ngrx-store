import { ActionReducerMap } from "@ngrx/store";
import * as fromPosts from './posts.reducer'; 
import * as fromComments from './comments.reducer'; 

export const postsStateFeatureKey = 'postsState';

export interface AppState {
  posts: fromPosts.State;
  comments: fromComments.State;
}

export const reducers: ActionReducerMap<AppState> = {
  posts: fromPosts.reducer,
  comments: fromComments.reducer
};