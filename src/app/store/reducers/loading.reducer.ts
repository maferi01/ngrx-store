import { Action, createReducer, on } from '@ngrx/store';
import * as LoadingActions from '../actions/loading.actions';

export const loadingFeatureKey = 'loading';

export type LoadingInfo={
  actionSource: string, idGroupLoading: string,   idLoading?: string
} ;

export interface State {
  stack: LoadingInfo[]
}

export const initialState: State = {
  stack:[]
};

export const reducer = createReducer(
  initialState,
  // on(LoadingActions.loadLoadings, state => state),
  on(LoadingActions.showLoading, (state, action) => {
    const inf= state.stack.find(l=> l.idGroupLoading===action.idGroupLoading && action.idLoading===l.idLoading )
    if(!inf){
      return  {stack: [...state.stack,{idLoading:action.idLoading, idGroupLoading: action.idGroupLoading, actionSource: action.actionSource} ]}
    }
    return {...state};
  }),
  on(LoadingActions.hideLoading, (state, action) => {
      return  {stack: state.stack.filter(l=> !(l.idGroupLoading===action.idGroupLoading && action.idLoading===l.idLoading))}
     }),

);
