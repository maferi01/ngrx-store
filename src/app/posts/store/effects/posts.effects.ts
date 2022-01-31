import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AbstractNgRxService } from 'src/app/services/base/abstractNgRx.service';
import { PageRequest, SortInfo } from '../../../services/models/filter.model';
import { PostsService } from '../../services/posts.service';
import * as PostsActions from '../actions/posts.actions';
import { selectFilterListInfo, selectFilterListRequest } from '../selectors/posts.selectors';




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

