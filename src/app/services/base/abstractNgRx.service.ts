import { AbstractApp } from "src/app/shared/base/abstract-app";
import { Injectable, OnDestroy } from '@angular/core';
import { createEffect, ofType, concatLatestFrom, Actions } from "@ngrx/effects";
import { concatMap, of, map, catchError, Observable } from "rxjs";
import { Action, Store } from "@ngrx/store";
import { TypeEventPagination } from "my-lib-display";
import { PageInfo, PageRequest, SortInfo } from "../models/filter.model";

@Injectable()
export abstract class AbstractNgRxService extends AbstractApp implements OnDestroy{
  protected store:Store;
  protected actions$: Actions;

  createEffectLoad=(actionLoad:any,actionLoadSuccess:any,actionLoadFailiure:any,fn:(filter:any,sortInfo:SortInfo,pageRequest:PageRequest)=>Observable<any>)=>createEffect(() => {
    return this.actions$.pipe( 
      ofType(actionLoad),
      concatMap((action) =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        //this.postsService.getPosts(action.filterPost,action.sortInfo,action.pageRequest)
        fn(action.filter,action.sortInfo,action.pageRequest)
        .pipe(
          map(data => actionLoadSuccess({data: data.data,link:data.link,filter: action.filter,sortInfo: action.sortInfo,pageRequest: action.pageRequest})),
          catchError(error => of(actionLoadFailiure({ error }))))
      )
    );
  });
  
  createEffectLoadInit=(actionLoadInit:any,actionLoad:any,selectFilterListRequest:any)=>createEffect(() => {
    return this.actions$.pipe( 
      ofType(actionLoadInit),
      concatMap((action) =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        of(action).pipe(
          concatLatestFrom(action=>this.store.select(selectFilterListRequest)),
          map(([action,filterList]:[any,any]) => actionLoad({
            ...filterList
          })),
          ))      
    );
  });

  createEffectFilter=(actionFilter:any,actionLoad:any,selectFilterListRequest:any)=>createEffect(() => {
    return this.actions$.pipe( 
      ofType(actionFilter),
      concatMap((action) =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        of(action).pipe(
          concatLatestFrom(action=>this.store.select(selectFilterListRequest)),
          map(([action,filterList]) => actionLoad({
            ...filterList as any,
            filter:action.filter,
          })),
          ))      
    );
  });
 
  createEffectPagination=(actionPagination:any,actionLoad:any,selectFilterListInfo:any)=> createEffect(() => {
    return this.actions$.pipe( 
      ofType(actionPagination),
      concatMap((action) =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        of(action).pipe(
          concatLatestFrom(action=>this.store.select(selectFilterListInfo)),
          map(([action,filterList]:[any,any]) => actionLoad({
            filter: filterList.filter,
            sortInfo: filterList.order,
            pageRequest: {
              requestLink: this.getLink(action.typeEventPagination,filterList.page),
              pageSize:filterList.page.pageSize,
              pageIndex: filterList.page.pageIndex 
            }  
          })),
          ))      
    );
  });

  createEffectSort=(actionSort:any,actionLoad:any,selectFilterListRequest:any)=>  createEffect(() => {
    return this.actions$.pipe( 
      ofType(actionSort),
      concatMap((action) =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        of(action).pipe(
          concatLatestFrom(action=>this.store.select(selectFilterListRequest)),
          map(([action,filterList]:[any,any]) => actionLoad({
            ...filterList,
            sortInfo:action.sortInfo
          })),
          ))      
    );
  });

  


  protected getLink(event:TypeEventPagination, pageInfo: PageInfo): string {
    switch (event) {
      case 'first':
        return pageInfo.linkInfo.linkFisrt;
      case 'last':
        return pageInfo.linkInfo.linkLast;
      case 'prev':
        return pageInfo.linkInfo.linkPrev;
      case 'next':
        return pageInfo.linkInfo.linkNext;
      default:
        return null;
    }
  }



  //constructor(protected name: string) { super(name) } 



  ngOnDestroy(): void {
    this.console.debug('Destroy service')
  }

}
