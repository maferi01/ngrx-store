import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { DialogService } from 'my-lib-display';
import { concatMap, of, map, filter, catchError } from 'rxjs';
import { AbstractListNgRxService } from 'src/app/services/base/abstractNgRx.service';
import { LoadInfo, SortInfo } from 'src/app/services/models/filter.model';
import { rxlog } from 'src/app/services/utils/opersrx';
import { FormCommentComponent } from '../../components/form-comment/form-comment.component';
import { FilterComment } from '../../models/comment';
import { CommentsService } from '../../services/comments.service';
import * as CommentsActions from '../actions/comments.actions';
import { selectorsList } from '../selectors/comments.selectors';


@Injectable()
export class CommentsEffects extends AbstractListNgRxService {



  loadComments$ = this.createEffectLoad(CommentsActions.loadComments, CommentsActions.loadCommentssSuccess, CommentsActions.loadCommentssFailure,
    ({ filter, sortInfo, pageRequest }: LoadInfo<FilterComment>) => this.commentsService.getComments(filter, sortInfo, pageRequest));

  loadInitComments$ = this.createEffectLoadInit([CommentsActions.loadInitComments,CommentsActions.addCommentSuccess], CommentsActions.loadComments, selectorsList);
  filterComments$ = this.createEffectFilter(CommentsActions.filterComments, CommentsActions.loadComments, selectorsList);
  paginationComments$ = this.createEffectPagination(CommentsActions.paginationComments, CommentsActions.loadComments, selectorsList);
  sortComments$ = this.createEffectSort(CommentsActions.sortComments, CommentsActions.loadComments, selectorsList);

  addDialogComment$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CommentsActions.addDialogComment),
      concatMap((action) =>
        this.dialogService.openDialog(FormCommentComponent).pipe(
          rxlog('Data Dialog closed'),
          filter(data=> !!data),
          map((data:any) => CommentsActions.addComment({data}))
        )
      ))    
    });

  addComment$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(CommentsActions.addComment),
        concatMap((action) =>
          this.commentsService.addEntity(action.data)
            .pipe(
              //rxZod(xsdLoadInfoSuccess),
              map(() => CommentsActions.addCommentSuccess()),
              catchError(error => of(CommentsActions.addCommentFailure({ error })))
              )
        )
      );
    });
    
    editDialogComment$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(CommentsActions.editDialogComment),
        concatMap((action) =>
          this.dialogService.openDialog(FormCommentComponent,action.data).pipe(
            rxlog('Data Dialog closed'),
            filter(data=> !!data),
            map((data:any) => CommentsActions.addComment({data}))
          )
        ))    
      });
  



  constructor(protected override actions$: Actions, protected override store: Store, private commentsService: CommentsService, private dialogService: DialogService) {
    super()
  }

}


