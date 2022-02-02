import { AbstractApp } from "src/app/shared/base/abstract-app";
import { Injectable, OnDestroy } from '@angular/core';
import { createEffect, ofType, concatLatestFrom, Actions } from "@ngrx/effects";
import { concatMap, of, map, catchError, Observable } from "rxjs";
import { Action, Store } from "@ngrx/store";
import { TypeEventPagination } from "my-lib-display";
import { IResponseData, ISelectorsList, LoadInfo, LoadInfoSuccces, PageInfo, PageRequest, SortInfo } from "../models/filter.model";

@Injectable()
export  class AbstractListNgRxService extends AbstractApp implements OnDestroy {
  protected store: Store;
  protected actions$: Actions;

  createEffectLoad = (actionLoad: any, actionLoadSuccess: any, actionLoadFailiure: any, fn: (loadInfo: LoadInfo) => Observable<IResponseData>) => createEffect(() => {
    return this.actions$.pipe(
      ofType(actionLoad),
      concatMap((action: LoadInfo) =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        //this.postsService.getPosts(action.filterPost,action.sortInfo,action.pageRequest)
        fn(action)
          .pipe(
            map((data: IResponseData) => actionLoadSuccess({ data: data.data, link: data.link, filter: action.filter, sortInfo: action.sortInfo, pageRequest: action.pageRequest } as LoadInfoSuccces)),
            catchError(error => of(actionLoadFailiure({ error }))))
      )
    );
  });

  createEffectLoadInit = (actionLoadInit: any, actionLoad: any, selectorsList :ISelectorsList) => createEffect(() => {
    return this.actions$.pipe(
      ofType(actionLoadInit),
      concatMap((action) =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        of(action).pipe(
          concatLatestFrom(action => this.store.select(selectorsList.selectFilterListRequest)),
          map(([action, filterList]: [any, any]) => actionLoad({
            ...filterList
          } as LoadInfo)),
        ))
    );
  });

  createEffectFilter = (actionFilter: any, actionLoad: any, selectorsList :ISelectorsList) => createEffect(() => {
    return this.actions$.pipe(
      ofType(actionFilter),
      concatMap((action) =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        of(action).pipe(
          concatLatestFrom(action => this.store.select(selectorsList.selectFilterListRequest)),
          map(([action, filterList]) => actionLoad({
            ...filterList as any,
            filter: action.filter,
          } as LoadInfo)),
        ))
    );
  });

  createEffectPagination = (actionPagination: any, actionLoad: any, selectorsList :ISelectorsList) => createEffect(() => {
    return this.actions$.pipe(
      ofType(actionPagination),
      concatMap((action) =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        of(action).pipe(
          concatLatestFrom(action => this.store.select(selectorsList.selectFilterListInfo)),
          map(([action, filterList]: [any, any]) => actionLoad({
            filter: filterList.filter,
            sortInfo: filterList.order,
            pageRequest: {
              requestLink: this.getLink(action.typeEventPagination, filterList.page),
              pageSize: filterList.page.pageSize,
              pageIndex: filterList.page.pageIndex
            }
          } as LoadInfo)),
        ))
    );
  });

  createEffectSort = (actionSort: any, actionLoad: any, selectorsList :ISelectorsList) => createEffect(() => {
    return this.actions$.pipe(
      ofType(actionSort),
      concatMap((action) =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        of(action).pipe(
          concatLatestFrom(action => this.store.select(selectorsList.selectFilterListRequest)),
          map(([action, filterList]: [any, any]) => actionLoad({
            ...filterList,
            sortInfo: action.sortInfo
          } as LoadInfo)),
        ))
    );
  });




  protected getLink(event: TypeEventPagination, pageInfo: PageInfo): string {
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
