import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Sort } from '@angular/material/sort';
import { Store } from '@ngrx/store';
import { TypeEventPagination } from 'my-lib-display';
import { FilterComment } from '../../models/comment';
import { selectListComments } from '../../store/selectors/comments.selectors';
import { selectLoading, selectFilter, selectLinksStatus, selectSort } from '../../store/selectors/comments.selectors';
import * as CommentsActions from '../../store/actions/comments.actions';

@Component({
  selector: 'app-list-comments',
  templateUrl: './list-comments.component.html',
  styleUrls: ['./list-comments.component.scss']
})
export class ListCommentsComponent implements OnInit {

  aux:string;
  comments$ = this.store.select(selectListComments);
  loading$ = this.store.select(selectLoading);
  filter$ = this.store.select(selectFilter);
  linksStatus$ = this.store.select(selectLinksStatus);
  sort$ = this.store.select(selectSort);

  constructor( private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(CommentsActions.loadInitComments());

  }

  filterList(filter:FilterComment){
    this.store.dispatch(CommentsActions.filterComments({filter}));    
  }

  paginate(typeEventPagination:TypeEventPagination){
    this.store.dispatch(CommentsActions.paginationComments({typeEventPagination}));    
  }

  sortData(sort:Sort){
    this.store.dispatch(CommentsActions.sortComments({sortInfo:sort}));    
    
  }

  get validations(){
    return [Validators.required]
  }

}
