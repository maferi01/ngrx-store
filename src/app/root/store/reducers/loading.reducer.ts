import { createReducer, on } from '@ngrx/store';
import { State } from 'src/app/shared/store/loading/model';
import * as LoadingActions from '../../../shared/store/loading/loading.actions';

export const initialState: State = {
  stack:[]
};

export const reducer = createReducer(
  initialState,
  on(LoadingActions.showLoading, (state, action:any) => {
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
