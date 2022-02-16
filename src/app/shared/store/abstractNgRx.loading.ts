import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action } from '@ngrx/store';
import { catchError, concatMap, filter, map, of } from "rxjs";

import * as LoadingActions from '../../store/actions/loading.actions';

export type ActionsLoading=  {actionType:string,fnLoadingInfo:(action:any)=> ActionLoadingInfo}[]

export type ActionLoadingInfo={
  type: 'show' | 'hide';
  idGroupLoading?: string;
  idLoading?: string; 
} 

function getActions(actionsLoading:ActionsLoading){
   return actionsLoading.map(ac=> ac.actionType);
}

function getLoadingInfo(action:Action,actionsLoading:ActionsLoading):ActionLoadingInfo{
  return (actionsLoading.find(ac=> ac.actionType===action.type) as {actionType:string,fnLoadingInfo:(action:any)=> ActionLoadingInfo}).fnLoadingInfo(action);
}

@Injectable()
export  class AbstractLoadingEffects {


  createEffectLoadingShow = (actionsLoading:ActionsLoading) => createEffect(() => {
    return this.actions$.pipe( 
      ofType(...getActions(actionsLoading)),
      concatMap((action) =>
        of(getLoadingInfo(action,actionsLoading)).pipe(
          filter(loadingInfo=>loadingInfo.type==='show'),
          map(loadingInfo => LoadingActions.showLoading({actionSource:action.type,idGroupLoading:loadingInfo.idGroupLoading,idLoading:loadingInfo.idLoading })),
          catchError(error => of(LoadingActions.loadLoadingsFailure({ error }))))
      )
    );
  });


  createEffectLoadingHide = (actionsLoading:ActionsLoading) => createEffect(() => {
    return this.actions$.pipe( 
      ofType(...getActions(actionsLoading)),
      concatMap((action) =>
        of(getLoadingInfo(action,actionsLoading)).pipe(
          filter(loadingInfo=>loadingInfo.type==='hide'),
          map(loadingInfo => LoadingActions.hideLoading({actionHide:action.type,idGroupLoading:loadingInfo.idGroupLoading,idLoading:loadingInfo.idLoading })),
          catchError(error => of(LoadingActions.loadLoadingsFailure({ error }))))
      )
    );
  });

  

  constructor(private actions$: Actions) {}

}
