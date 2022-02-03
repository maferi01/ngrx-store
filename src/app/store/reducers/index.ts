import {
  ActionReducerMap, MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromLoading from './loading.reducer';
import * as fromError from './error.reducer';

export interface State {
  loading:fromLoading.State,
  error: fromError.StateError
}

export const reducers: ActionReducerMap<State> = {
  loading: fromLoading.reducer,
  error: fromError.reducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
