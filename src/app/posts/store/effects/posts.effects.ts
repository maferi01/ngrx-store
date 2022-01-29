import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, combineLatestWith } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';

import * as PostsActions from '../actions/posts.actions';
import { PostsService } from '../../services/posts.service';
import { ActionCreator, Store } from '@ngrx/store';
import { selectFilterListInfo, selectFilterListRequest } from '../selectors/posts.selectors';
import { FilterListInfo, PageInfo, PageRequest, SortInfo } from '../../../services/models/filter.model';
import { TypeEventPagination } from 'my-lib-display';
import { AbstractNgRxService } from 'src/app/services/base/abstractNgRx.service';



@Injectable()
export class PostsEffects extends AbstractNgRxService{

  
  loadPosts$ = this.createEffectLoad(PostsActions.loadPosts,PostsActions.loadPostssSuccess,PostsActions.loadPostssFailure,
    (filter:any,sortInfo:SortInfo,pageRequest:PageRequest)=>this.postsService.getPosts(filter,sortInfo,pageRequest)  )  ;
  loadInitPosts$ = this.createEffectLoadInit(PostsActions.loadInitPosts,PostsActions.loadPosts,selectFilterListRequest);
  filterPosts$ = this.createEffectFilter(PostsActions.filterPosts,PostsActions.loadPosts,selectFilterListRequest);
  paginationPosts$ = this.createEffectPagination(PostsActions.paginationPosts,PostsActions.loadPosts,selectFilterListInfo);
  sortPosts$ = this.createEffectSort(PostsActions.sortPosts,PostsActions.loadPosts,selectFilterListRequest);  



  constructor(protected override actions$: Actions,protected override store:Store, private postsService:PostsService ) {
    super()
  }

}

