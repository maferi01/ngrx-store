import {
  ActionReducerMap, MetaReducer
} from '@ngrx/store';
import * as fromLoading from '../../../shared/store/loading/model';
import * as fromLoadingReducer from '../reducers/loading.reducer';
import * as fromError from './error.reducer';
import { environment } from 'src/environments/environment';

export interface State {
  loading:fromLoading.State,
  error: fromError.StateError
}

export const reducers: ActionReducerMap<State> = {
  loading: fromLoadingReducer.reducer,
  error: fromError.reducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
