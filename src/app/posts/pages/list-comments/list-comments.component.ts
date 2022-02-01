import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Sort } from '@angular/material/sort';
import { Store } from '@ngrx/store';
import { TypeEventPagination } from 'my-lib-display';
import { FilterComment } from '../../models/comment';
import { selectorsList } from '../../store/selectors/comments.selectors';
import * as CommentsActions from '../../store/actions/comments.actions';

@Component({
  selector: 'app-list-comments',
  templateUrl: './list-comments.component.html',
  styleUrls: ['./list-comments.component.scss']
})
export class ListCommentsComponent implements OnInit {

  aux:string;
  comments$ = this.store.select(selectorsList.selectListData);
  loading$ = this.store.select(selectorsList.selectLoading);
  filter$ = this.store.select(selectorsList.selectFilter);
  linksStatus$ = this.store.select(selectorsList.selectLinksStatus);
  sort$ = this.store.select(selectorsList.selectSort);

  constructor( private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(CommentsActions.loadInitComments());

  }

  filterList(filter:FilterComment){
    console.log('filter enter***********',filter);
    this.store.dispatch(CommentsActions.filterComments({filter}));    
  }

  paginate(typeEventPagination:TypeEventPagination){
    this.store.dispatch(CommentsActions.paginationComments({typeEventPagination}));    
  }

  sortData(sort:Sort){
    this.store.dispatch(CommentsActions.sortComments({sortInfo:sort}));    
    
  }

  testExtra(){
    this.store.dispatch(CommentsActions.extraComments({data:'OK extra'}));    
  }

  get validations():[]{
    return []
  }

}
