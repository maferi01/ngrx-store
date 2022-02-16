import { ActionReducerMap } from "@ngrx/store";
import * as fromPosts from './posts.reducer'; 
import * as fromComments from './comments.reducer'; 
import { StateList } from "src/app/shared/store/reducer.list";

export const postsStateFeatureKey = 'postsState';

export interface AppState {
  posts: StateList;
  comments: fromComments.StateComments;
}

export const reducers: ActionReducerMap<AppState> = {
  posts: fromPosts.reducer,
  comments: fromComments.reducer
};