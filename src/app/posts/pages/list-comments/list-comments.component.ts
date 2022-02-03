import { AfterViewInit, Component, ContentChild, OnInit, QueryList, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Sort } from '@angular/material/sort';
import { Store } from '@ngrx/store';
import { DialogService, TypeEventPagination } from 'my-lib-display';
import { FilterComment } from '../../models/comment';
import { selectorsList,selectorLoadingComments, selectorLoadingQuery } from '../../store/selectors/comments.selectors';
import * as CommentsActions from '../../store/actions/comments.actions';
import { FormComponent } from 'projects/my-lib-display/src/public-api';
import { delay, of, tap } from 'rxjs';
import { FormField } from 'projects/my-lib-display/src/lib/fields/form-field.directive';
import { createSelectorLoading, createSelectorLoadingGroup, filterLoadingId } from 'src/app/store/selectors/loading.selectors';
import { FormCommentComponent } from '../../components/form-comment/form-comment.component';

@Component({
  selector: 'app-list-comments',
  templateUrl: './list-comments.component.html',
  styleUrls: ['./list-comments.component.scss']
})
export class ListCommentsComponent implements OnInit,AfterViewInit {

  aux:string;
  comments$ = this.store.select(selectorsList.selectListData);
  loading$ = this.store.select(selectorLoadingComments);
  loadingGroup$ =this.store.select(selectorLoadingQuery);
  filter$ = this.store.select(selectorsList.selectFilter);
  linksStatus$ = this.store.select(selectorsList.selectLinksStatus);
  sort$ = this.store.select(selectorsList.selectSort);


  queryLoadings:{name:string,data:string}[]=[];


  @ViewChild('formfilter') formComponent:FormComponent;

  constructor( private store: Store, private dialogSerice:DialogService) { }
  

  ngOnInit(): void {
    this.store.dispatch(CommentsActions.loadInitComments());

  }

  ngAfterViewInit(): void {
    console.log('form Comments controls', this.formComponent.fields.length, Object.keys(this.formComponent.group.controls).length) ;
   //(this.formComponent.group.controls['lastgroup'] as FormGroup)?.controls['text-group-last-2'].setValue('My val from comments')
   // this.formComponent.detect.detectChanges();

    // this.formComponent.fields.changes.pipe(
    //   tap((val) => this.updateFields(val))
    // ) .subscribe();

  }

  updateFields(fields: QueryList<FormField>){
    fields.forEach(field=>{
      console.log('field Comment Filter=',field.name,field.control,field);
      // if(field.name==='text-group-last-cent'){
      //   field.control.setValue('change from list comments  XXX')
      // }          
    })
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

  onClickRow(row:any){
    console.log('clicked row', row)
    this.queryLoadings.push({name:row.author,data:null})
    this.callQuery(row.author).subscribe(()=>      this.queryLoadings.find(q=> q.name===row.author).data='Finish query '+row.author)
    
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
    this.dialogSerice.openDialog(FormCommentComponent).subscribe((d)=> console.log('data Dialog ',d));
  }

}

