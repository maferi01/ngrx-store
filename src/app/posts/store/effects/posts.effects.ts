import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, combineLatestWith } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';

import * as PostsActions from '../actions/posts.actions';
import { PostsService } from '../../services/posts.service';
import { Store } from '@ngrx/store';
import { selectFilterList } from '../selectors/posts.selectors';



@Injectable()
export class PostsEffects {

  loadPostss$ = createEffect(() => {
    return this.actions$.pipe( 
      ofType(PostsActions.loadPosts),
      concatMap((action) =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.postsService.getPosts(action.filterList).pipe(
          map(data => PostsActions.loadPostssSuccess({ data: data.posts, filterList: action.filterList })),
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
          concatLatestFrom(action=>this.store.select(selectFilterList)),
          map(([action,filterList]) => PostsActions.loadPosts({filterList:{
            ...filterList
          }})),
          ))      
    );
  });


  filterPosts$ = createEffect(() => {
    return this.actions$.pipe( 
      ofType(PostsActions.filterPosts),
      concatMap((action) =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        of(action).pipe(
          concatLatestFrom(action=>this.store.select(selectFilterList)),
          map(([action,filterList]) => PostsActions.loadPosts({filterList:{
            ...filterList,
            filter:action.filter
          }})),
          ))      
    );
  });



  constructor(private actions$: Actions,private store:Store, private postsService:PostsService ) {}

}
function combineLatestFrom(arg0: (action: any) => Observable<import("../../../services/models/filter.model").FilterList<import("../../models/models").FilterPost>>): import("rxjs").OperatorFunction<{ filter: import("../../models/models").FilterPost; } & import("@ngrx/store/src/models").TypedAction<"[Posts] Filter Posts">, unknown> {
  throw new Error('Function not implemented.');
}

