import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, combineLatestWith } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';

import * as PostsActions from '../actions/posts.actions';
import { PostsService } from '../../services/posts.service';
import { Store } from '@ngrx/store';
import { selectFilterListInfo, selectFilterListRequest } from '../selectors/posts.selectors';
import { FilterListInfo, PageInfo } from '../../../services/models/filter.model';
import { TypeEventPagination } from 'my-lib-display';



@Injectable()
export class PostsEffects {

  loadPostss$ = createEffect(() => {
    return this.actions$.pipe( 
      ofType(PostsActions.loadPosts),
      concatMap((action) =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.postsService.getPosts(action.filterPost,action.sortInfo,action.pageRequest).pipe(
          map(data => PostsActions.loadPostssSuccess({data: data.posts,link:data.link,filterPost: action.filterPost,sortInfo: action.sortInfo,pageRequest: action.pageRequest})),
          catchError(error => of(PostsActions.loadPostssFailure({ error }))))
      )
    );
  });

  loadInitPosts$ = createEffect(() => {
    return this.actions$.pipe( 
      ofType(PostsActions.loadInitPosts),
      concatMap((action) =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        of(action).pipe(
          concatLatestFrom(action=>this.store.select(selectFilterListRequest)),
          map(([action,filterList]) => PostsActions.loadPosts({
            ...filterList
          })),
          ))      
    );
  });


  filterPosts$ = createEffect(() => {
    return this.actions$.pipe( 
      ofType(PostsActions.filterPosts),
      concatMap((action) =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        of(action).pipe(
          concatLatestFrom(action=>this.store.select(selectFilterListRequest)),
          map(([action,filterList]) => PostsActions.loadPosts({
            ...filterList,
            filterPost:action.filter,
          })),
          ))      
    );
  });




  paginationPosts$ = createEffect(() => {
    return this.actions$.pipe( 
      ofType(PostsActions.paginationPosts),
      concatMap((action) =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        of(action).pipe(
          concatLatestFrom(action=>this.store.select(selectFilterListInfo)),
          map(([action,filterList]) => PostsActions.loadPosts({
            filterPost: filterList.filter,
            sortInfo: filterList.order,
            pageRequest: {
              requestLink: this.getLink(action.typeEventPagination,filterList.page),
              pageSize:filterList.page.pageSize,
              pageIndex: filterList.page.pageIndex 
            }  
          })),
          ))      
    );
  });


  protected getLink(event:TypeEventPagination, pageInfo: PageInfo): string {
    switch (event) {
      case 'first':
        return pageInfo.linkInfo.linkFisrt;
      case 'last':
        return pageInfo.linkInfo.linkLast;
      case 'prev':
        return pageInfo.linkInfo.linkPrev;
      case 'next':
        return pageInfo.linkInfo.linkNext;
      default:
        return null;
    }
  }



  constructor(private actions$: Actions,private store:Store, private postsService:PostsService ) {}

}
function combineLatestFrom(arg0: (action: any) => Observable<import("../../../services/models/filter.model").FilterListInfo<import("../../models/models").FilterPost>>): import("rxjs").OperatorFunction<{ filter: import("../../models/models").FilterPost; } & import("@ngrx/store/src/models").TypedAction<"[Posts] Filter Posts">, unknown> {
  throw new Error('Function not implemented.');
}

