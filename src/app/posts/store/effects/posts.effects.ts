import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';

import * as PostsActions from '../actions/posts.actions';
import { PostsService } from '../../services/posts.service';



@Injectable()
export class PostsEffects {

  loadPostss$ = createEffect(() => {
    return this.actions$.pipe( 
      ofType(PostsActions.loadPosts),
      concatMap((action) =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.postsService.getPosts(action.filterList).pipe(
          map(data => PostsActions.loadPostssSuccess({ data: data.posts })),
          catchError(error => of(PostsActions.loadPostssFailure({ error }))))
      )
    );
  });


  filterPosts$ = createEffect(() => {
    return this.actions$.pipe( 
      ofType(PostsActions.filterPosts),
      concatMap((action) =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        of(null).pipe(
          map(data => PostsActions.loadPosts({filterList:{
            filter:action.filter
          }})),
          ))      
    );
  });



  constructor(private actions$: Actions, private postsService:PostsService ) {}

}
