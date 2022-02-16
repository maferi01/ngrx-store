import { ComponentRef, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { DialogService } from 'my-lib-display';
import { catchError, concatMap, filter, finalize, interval, map, of, takeUntil } from 'rxjs';
import { AbstractListNgRxService } from 'src/app/shared/store/abstractNgRx.service';
import { LoadInfo } from 'src/app/shared/store/filter.list.model';
import { consoleApp } from 'src/app/shared/utils/logger';
import { rxlog } from 'src/app/shared/utils/opersrx';
import { FormCommentComponent } from '../../components/form-comment/form-comment.component';
import { Comment, FilterComment } from '../../models/comment';
import { CommentsService } from '../../services/comments.service';
import * as CommentsActions from '../actions/comments.actions';
import { selectorsList } from '../selectors/comments.selectors';

@Injectable()
export class CommentsEffects extends AbstractListNgRxService {



  loadComments$ = this.createEffectLoad(CommentsActions.loadComments, CommentsActions.loadCommentssSuccess, CommentsActions.loadCommentssFailure,
    ({ filter, sortInfo, pageRequest }: LoadInfo<FilterComment>) => this.commentsService.getComments(filter, sortInfo, pageRequest));

  loadInitComments$ = this.createEffectLoadInit([CommentsActions.loadInitComments,CommentsActions.addCommentSuccess,CommentsActions.updateCommentSuccess], CommentsActions.loadComments, selectorsList);
  filterComments$ = this.createEffectFilter(CommentsActions.filterComments, CommentsActions.loadComments, selectorsList);
  paginationComments$ = this.createEffectPagination(CommentsActions.paginationComments, CommentsActions.loadComments, selectorsList);
  sortComments$ = this.createEffectSort(CommentsActions.sortComments, CommentsActions.loadComments, selectorsList);

  addDialogComment$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CommentsActions.addDialogComment),
      concatMap((action) =>
        this.dialogService.openDialog(FormCommentComponent).pipe(
          rxlog('Data Dialog closed'),
          filter<any>(data=> !!data),
          map(({id,comment,author}:Comment) => CommentsActions.addComment({data:{id,comment,author}}))
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
          this.dialogService.openDialog(FormCommentComponent,action.data,((comp:ComponentRef<FormCommentComponent>,refDialog)=> {
            consoleApp(this).log('comp Inside dialog ***',comp)
           comp.instance.onChange.pipe(finalize(()=>consoleApp(this).log('obs in CLOSED******') ),takeUntil(refDialog.afterClosed())).subscribe((val)=> comp.instance.dataFormInput= {...comp.instance.dataFormInput,comment: val+'-------'  } )              
          })).pipe(
            rxlog('Data Dialog closed'),
            filter<any>(data=> !!data),
            map(({id,comment,author}:Comment) => CommentsActions.updateComment({data:{id,comment,author}}))
          )
        ))    
      });
  
      updateComment$ = createEffect(() => {
        return this.actions$.pipe(
          ofType(CommentsActions.updateComment),
          concatMap((action) =>
            this.commentsService.updateEntity(action.data)
              .pipe(
                //rxZod(xsdLoadInfoSuccess),
                map(() => CommentsActions.updateCommentSuccess()),
                catchError(error => of(CommentsActions.updateCommentFailure({ error })))
                )
          )
        );
      });
      
   


  constructor(protected override actions$: Actions, protected override store: Store, private commentsService: CommentsService, private dialogService: DialogService) {
    super()
  }

}


