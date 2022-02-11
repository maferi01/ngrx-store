import { AfterViewInit, Component, Injector, OnInit, QueryList, ViewChild } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Store } from '@ngrx/store';
import { BaseComponent, TypeEventPagination } from 'my-lib-display';
import { delay, of, tap } from 'rxjs';
import { SortInfo } from 'src/app/services/models/filter.model';
import { NameLog } from 'src/app/services/utils/logger';
import { rxDestroy, rxlog, rxlogth } from 'src/app/services/utils/opersrx';
import { withDestroy, withForm } from 'src/app/shared/base/mixings-comp';
import { filterLoadingId } from 'src/app/store/selectors/loading.selectors';
import { InputFields } from 'src/app/users/components/users/users.component';
import { Comment, FilterComment } from '../../models/comment';
import * as CommentsActions from '../../store/actions/comments.actions';
import { selectorLoadingComments, selectorLoadingQuery, selectorsList } from '../../store/selectors/comments.selectors';

@Component({
  selector: 'app-list-comments',
  templateUrl: './list-comments.component.html',
  styleUrls: ['./list-comments.component.scss']
})
@NameLog('ListCommentsComponent')
export class ListCommentsComponent extends 
InputFields(
withForm(
withDestroy(
BaseComponent)))  implements OnInit,AfterViewInit {

  aux!:string;
  comments$ = this.store.select(selectorsList.selectListData);
  loading$ = this.store.select(selectorLoadingComments);
  loadingGroup$ =this.store.select(selectorLoadingQuery);
  filter$ = this.store.select(selectorsList.selectFilter);
  linksStatus$ = this.store.select(selectorsList.selectLinksStatus);
  sort$ = this.store.select(selectorsList.selectSort);


  queryLoadings:{name:string,data:string|null}[]=[];



  constructor( private store: Store,public override injector: Injector) {super(injector) }
  

  override ngOnInit(): void {
    this.store.dispatch(CommentsActions.loadInitComments());
    super.ngOnInit();
    this.subjectFields$.pipe(rxDestroy(this),rxlogth(this)('fields form subject')).subscribe()
  }

 
  filterList(filter:FilterComment){
    console.log('filter enter***********',filter);
    this.store.dispatch(CommentsActions.filterComments({filter}));    
  }

  paginate(typeEventPagination:TypeEventPagination){
    this.store.dispatch(CommentsActions.paginationComments({typeEventPagination}));    
  }

  sortData(sort:Sort){
    this.store.dispatch(CommentsActions.sortComments({sortInfo:sort as SortInfo}));    
    
  }

  testExtra(){
    this.store.dispatch(CommentsActions.extraComments({data:'OK extra'}));    
  }

  get validations():[]{
    return []
  }

  onClickRow(row:Comment){
    
    this.store.dispatch(CommentsActions.editDialogComment({data:row}))

    this.queryLoadings.push({name:row.author,data:null})
    this.callQuery(row.author).pipe(
      rxDestroy(this)
    ).subscribe(()=>  (this.queryLoadings?.find(q=> q.name===row.author) as any).data='Finish query '+row.author)
    
  }
  callQuery(author: any) {
    function getRandomInt(min:number, max:number) {
      return Math.floor(Math.random() * (max - min)) + min;
    }
    const delayTime= 10000* getRandomInt(1,6)
    return of(author).pipe(
      tap(d=> this.store.dispatch(CommentsActions.queryBegin({data:author}))),
      delay(delayTime),
      tap(d=> this.store.dispatch(CommentsActions.queryEnd({data:author}))),
    )
  }

  selectQueryTest(name:string):any{
    // call selector direct
   //return this.store.select(createSelectorLoading('querytest',name))
   // call filter with selector obsevable
    return filterLoadingId(this.loadingGroup$,name);
  }

  openDialog():void{
    this.store.dispatch(CommentsActions.addDialogComment())
    
  }

}

