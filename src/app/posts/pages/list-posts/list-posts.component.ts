import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Sort } from '@angular/material/sort';
import { Store } from '@ngrx/store';
import { TypeEventPagination } from 'my-lib-display';
import { FilterPost } from '../../models/models';
import  * as PostsActions from '../../store/actions/posts.actions';
import { selectFilter, selectLinksStatus, selectListPosts, selectLoading, selectSort } from '../../store/selectors/posts.selectors';

@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.scss']
})
export class ListPostsComponent implements OnInit {

  aux:string;
  posts$ = this.store.select(selectListPosts);
  loading$ = this.store.select(selectLoading);
  filter$ = this.store.select(selectFilter);
  linksStatus$ = this.store.select(selectLinksStatus);
  sort$ = this.store.select(selectSort);

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
