import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable, concatMap, map, catchError, of } from 'rxjs';
import { AbstractNgRxService } from 'src/app/services/base/abstractNgRx.service';
import { PageRequest, SortInfo } from 'src/app/services/models/filter.model';
import { CommentsService } from '../../services/comments.service';
import * as CommentsActions from '../actions/comments.actions';
import { selectFilterListInfo, selectFilterListRequest } from '../selectors/comments.selectors';


@Injectable()
export class CommentsEffects extends AbstractNgRxService{


  loadComments$ = createEffect(() => {
    return this.actions$.pipe( 
      ofType(CommentsActions.loadComments),
      concatMap((action) =>
        this.commentsService.getComments(action.filter,action.sortInfo,action.pageRequest).pipe(
          map(data => CommentsActions.loadCommentssSuccess({data: data.comments,link:data.link,filter: action.filter,sortInfo: action.sortInfo,pageRequest: action.pageRequest})),
          catchError(error => of(CommentsActions.loadCommentssFailure({ error }))))
      )
    );
  });

  // loadCommentsxx$ = this.createEffectLoad(CommentsActions.loadComments,CommentsActions.loadCommentssSuccess,CommentsActions.loadCommentssFailure,
  //   (filter:any,sortInfo:SortInfo,pageRequest:PageRequest)=>this.commentsService.getComments(filter,sortInfo,pageRequest)  )  ;
  
  loadInitComments$ = this.createEffectLoadInit(CommentsActions.loadInitComments,CommentsActions.loadComments,selectFilterListRequest);
  filterComments$ = this.createEffectFilter(CommentsActions.filterComments,CommentsActions.loadComments,selectFilterListRequest);
  paginationComments$ = this.createEffectPagination(CommentsActions.paginationComments,CommentsActions.loadComments,selectFilterListInfo);
  sortComments$ = this.createEffectSort(CommentsActions.sortComments,CommentsActions.loadComments,selectFilterListRequest);  



  constructor(protected override actions$: Actions,protected override store:Store, private commentsService:CommentsService ) {
    super()
  }

}


