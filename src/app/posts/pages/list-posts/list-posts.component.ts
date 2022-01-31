import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Sort } from '@angular/material/sort';
import { Store } from '@ngrx/store';
import { TypeEventPagination } from 'my-lib-display';
import { FilterPost } from '../../models/models';
import  * as PostsActions from '../../store/actions/posts.actions';
import { selectorsList } from '../../store/selectors/posts.selectors';

@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.scss']
})
export class ListPostsComponent implements OnInit {

  aux:string;
  posts$ = this.store.select(selectorsList.selectListData);
  loading$ = this.store.select(selectorsList.selectLoading);
  filter$ = this.store.select(selectorsList.selectFilter);
  linksStatus$ = this.store.select(selectorsList.selectLinksStatus);
  sort$ = this.store.select(selectorsList.selectSort);

  constructor( private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(PostsActions.loadInitPosts());

  }

  filterList(filter:FilterPost){
    this.store.dispatch(PostsActions.filterPosts({filter}));    
  }

  paginate(typeEventPagination:TypeEventPagination){
    this.store.dispatch(PostsActions.paginationPosts({typeEventPagination}));    
  }

  sortData(sort:Sort){
    this.store.dispatch(PostsActions.sortPosts({sortInfo:sort}));    
    
  }

  get validations(){
    return [Validators.required]
  }
}
