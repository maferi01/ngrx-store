import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Sort } from '@angular/material/sort';
import { Store } from '@ngrx/store';
import { TypeEventPagination } from 'my-lib-display';
import { SortInfo } from 'src/app/services/models/filter.model';
import { NameLog } from 'src/app/services/utils/logger';
import { rxDestroy, rxlogth } from 'src/app/services/utils/opersrx';
import { BaseComponent } from 'src/app/shared/base/abstract-app';
import { withDestroy, withForm } from 'src/app/shared/base/mixings-comp';
import { FilterPost } from '../../models/models';
import  * as PostsActions from '../../store/actions/posts.actions';
import { selectorLoadingPosts, selectorsList } from '../../store/selectors/posts.selectors';

@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.scss']
})
@NameLog('ListPostsComponent')
export class ListPostsComponent extends withForm(
  withDestroy(
  BaseComponent)) implements OnInit {

  aux!:string;
  posts$ = this.store.select(selectorsList.selectListData);
  loading$ = this.store.select(selectorLoadingPosts);
  filter$ = this.store.select(selectorsList.selectFilter);
  linksStatus$ = this.store.select(selectorsList.selectLinksStatus);
  sort$ = this.store.select(selectorsList.selectSort);

  constructor( private store: Store, public override injector:Injector) {super(injector) }

  override ngOnInit(): void {
    this.store.dispatch(PostsActions.loadInitPosts());
    this.subjectFields$.pipe(rxDestroy(this as any),rxlogth(this)('fields form subject')).subscribe()
    super.ngOnInit();
  }

  filterList(filter:FilterPost){
    this.store.dispatch(PostsActions.filterPosts({filter}));    
  }

  paginate(typeEventPagination:TypeEventPagination){
    this.store.dispatch(PostsActions.paginationPosts({typeEventPagination}));    
  }

  sortData(sort:Sort){
    this.store.dispatch(PostsActions.sortPosts({sortInfo:sort as SortInfo}));    
    
  }

  get validations(){
    return [Validators.required]
  }
}
