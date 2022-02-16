import { Injectable } from '@angular/core';

import * as PostsActions from '../actions/posts.actions';
import * as CommentsActions from '../actions/comments.actions';
import { Action } from '@ngrx/store';
import { AbstractLoadingEffects } from 'src/app/shared/store/loading/abstractNgRx.loading';
import { LoadInfo, LoadInfoSuccces } from 'src/app/shared/store/list/filter.list.model';

type ActionsLoading=  {actionType:string,fnLoadingInfo:(action:any)=> ActionLoadingInfo}[]

type ActionLoadingInfo={
  type: 'show' | 'hide';
  idGroupLoading?: string;
  idLoading?: string; 
} 

function getActions(actionsLoading:ActionsLoading){
   return actionsLoading.map(ac=> ac.actionType);
}

function getLoadingInfo(action:Action,actionsLoading:ActionsLoading):ActionLoadingInfo{
  return (actionsLoading.find(ac=> ac.actionType===action.type) as any).fnLoadingInfo(action);
}

@Injectable()
export class LoadingEffects extends AbstractLoadingEffects{

  actionsLoading:ActionsLoading=[
    {actionType:PostsActions.loadPosts.type, fnLoadingInfo: (action:LoadInfo)=> ({type: 'show', idGroupLoading:'loadPost',idLoading: action.filter?.author})},
    {actionType:PostsActions.loadPostssSuccess.type, fnLoadingInfo: (action:LoadInfoSuccces)=> ({type: 'hide', idGroupLoading:'loadPost', idLoading:action.filter?.author})},
    {actionType:PostsActions.loadPostssFailure.type, fnLoadingInfo: (action)=> ({type: 'hide', idGroupLoading:'loadPost'})},
    // {actionType:CommentsActions.sortComments.type, fnLoadingInfo: (action:LoadInfo)=> ({type: 'show' })},
    // {actionType:CommentsActions.loadComments.type, fnLoadingInfo: (action:LoadInfo)=> ({type: 'show' })},
    // {actionType:CommentsActions.loadCommentssSuccess.type, fnLoadingInfo: (action:LoadInfoSuccces)=> ({type: 'hide'})},    
    {actionType:CommentsActions.loadComments.type, fnLoadingInfo: (action:LoadInfo)=> ({type: 'show', idGroupLoading:'loadComments',idLoading: action.filter?.author})},
    {actionType:CommentsActions.loadCommentssSuccess.type, fnLoadingInfo: (action:LoadInfoSuccces)=> ({type: 'hide', idGroupLoading:'loadComments', idLoading:action.filter?.author})},  
    {actionType:CommentsActions.loadCommentssFailure.type, fnLoadingInfo: (action)=> ({type: 'hide', idGroupLoading:'loadComments'})},   
    {actionType:CommentsActions.queryBegin.type, fnLoadingInfo: (action:any)=> ({type: 'show', idGroupLoading:'querytest', idLoading:action.data})},
    {actionType:CommentsActions.queryEnd.type, fnLoadingInfo: (action:any)=> ({type: 'hide', idGroupLoading:'querytest', idLoading:action.data})}
    
  ];



  showLoadings$ = this.createEffectLoadingShow(this.actionsLoading);
 
  hideLoadings$ = this.createEffectLoadingHide(this.actionsLoading);

 

}
