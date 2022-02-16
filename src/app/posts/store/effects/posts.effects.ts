import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { DialogService } from 'my-lib-display';
import { AbstractListNgRxService } from 'src/app/shared/store/abstractNgRx.service';
import { LoadInfo } from 'src/app/shared/store/filter.list.model';
import { FilterPost } from '../../models/models';
import { PostsService } from '../../services/posts.service';
import * as PostsActions from '../actions/posts.actions';
import { selectorsList } from '../selectors/posts.selectors';




@Injectable()
export class PostsEffects extends AbstractListNgRxService{

  
  loadPosts$ = this.createEffectLoad(PostsActions.loadPosts,PostsActions.loadPostssSuccess,PostsActions.loadPostssFailure,
    ({filter,sortInfo,pageRequest}:LoadInfo<FilterPost>)=>this.postsService.getPosts(filter,sortInfo,pageRequest)  )  ;
  loadInitPosts$ = this.createEffectLoadInit([PostsActions.loadInitPosts],PostsActions.loadPosts,selectorsList);
  filterPosts$ = this.createEffectFilter(PostsActions.filterPosts,PostsActions.loadPosts,selectorsList);
  paginationPosts$ = this.createEffectPagination(PostsActions.paginationPosts,PostsActions.loadPosts,selectorsList);
  sortPosts$ = this.createEffectSort(PostsActions.sortPosts,PostsActions.loadPosts,selectorsList);  



  constructor(protected override actions$: Actions,protected override store:Store, private postsService:PostsService,private dialogSerice:DialogService ) {
    super()
  }

}

