import {
  ActionReducerMap, MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromLoading from './loading.reducer';

export interface State {
  loading:fromLoading.State
}

export const reducers: ActionReducerMap<State> = {
  loading: fromLoading.reducer

};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
