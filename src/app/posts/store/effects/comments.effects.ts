import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AbstractNgRxService } from 'src/app/services/base/abstractNgRx.service';
import { LoadInfo } from 'src/app/services/models/filter.model';
import { FilterComment } from '../../models/comment';
import { CommentsService } from '../../services/comments.service';
import * as CommentsActions from '../actions/comments.actions';
import { selectorsList } from '../selectors/comments.selectors';


@Injectable()
export class CommentsEffects extends AbstractNgRxService{


  
   loadComments$ = this.createEffectLoad(CommentsActions.loadComments,CommentsActions.loadCommentssSuccess,CommentsActions.loadCommentssFailure,
     ({filter,sortInfo,pageRequest}:LoadInfo<FilterComment>)=>this.commentsService.getComments(filter,sortInfo,pageRequest)  )  ;
  
  loadInitComments$ = this.createEffectLoadInit(CommentsActions.loadInitComments,CommentsActions.loadComments,selectorsList);
  filterComments$ = this.createEffectFilter(CommentsActions.filterComments,CommentsActions.loadComments,selectorsList);
  paginationComments$ = this.createEffectPagination(CommentsActions.paginationComments,CommentsActions.loadComments,selectorsList);
  sortComments$ = this.createEffectSort(CommentsActions.sortComments,CommentsActions.loadComments,selectorsList);  



  constructor(protected override actions$: Actions,protected override store:Store, private commentsService:CommentsService ) {
    super()
  }

}


