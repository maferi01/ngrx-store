import { Injectable, OnDestroy } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { TypeEventPagination } from "my-lib-display";
import { catchError, concatMap, map, Observable, of } from "rxjs";
import { FilterListInfo, IResponseData, ISelectorsList, LoadInfo, LoadInfoSuccces, PageInfo, SortInfo, xsdLoadInfoSuccess } from "./filter.list.model";
import { rxZod } from '../../utils/zodrx';


@Injectable()
export  class AbstractListNgRxService  implements OnDestroy {
  protected store!: Store;
  protected actions$!: Actions;

  createEffectLoad = (actionLoad: any, actionLoadSuccess: any, actionLoadFailiure: any, fn: (loadInfo: LoadInfo) => Observable<IResponseData>) => createEffect(() => {
    return this.actions$.pipe(
      ofType(actionLoad),
      concatMap((action: LoadInfo) =>
        fn(action)
          .pipe(
            map((data: IResponseData)=>({ data: data.data, link: data.link, filter: action.filter, sortInfo: action.sortInfo, pageRequest: action.pageRequest } as LoadInfoSuccces)),
            rxZod(xsdLoadInfoSuccess),
            map((loadInfoSucces:LoadInfoSuccces) => actionLoadSuccess(loadInfoSucces)),
            catchError(error => of(actionLoadFailiure({ error })))
            )
      )
    );
  });

  createEffectLoadInit = (actionLoadInit: any[], actionLoad: any, selectorsList :ISelectorsList) => createEffect(() => {
    return this.actions$.pipe(
      ofType(...actionLoadInit),
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
      concatMap((action:{filter:any}) =>
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
      ofType(actionPagination as any),
      concatMap((action: {typeEventPagination:TypeEventPagination}) =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        of(action).pipe(
          concatLatestFrom(() => this.store.select(selectorsList.selectFilterListInfo )) as any,
          map(([action, filterList]:[action:{typeEventPagination:TypeEventPagination},filterList:FilterListInfo]) => actionLoad({
            filter: filterList.filter,
            sortInfo: filterList.order,
            pageRequest: {
              requestLink: this.getLink(action.typeEventPagination, filterList.page),
              pageSize: filterList?.page?.pageSize,
              pageIndex: filterList?.page?.pageIndex
            }
          } as LoadInfo)),
        ))
    );
  });

  createEffectSort = (actionSort: any , actionLoad: any, selectorsList :ISelectorsList) => createEffect(() => {
    return this.actions$.pipe(
      ofType(actionSort as any),
      concatMap((action: {sortInfo:SortInfo}) =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        of(action).pipe(
          concatLatestFrom(action => this.store.select(selectorsList.selectFilterListRequest)),
          map(([action, filterList] ) => actionLoad({
            ...filterList as any,
            sortInfo: action.sortInfo
          } as LoadInfo)),
        ))
    );
  });




  protected getLink(event: TypeEventPagination, pageInfo?: PageInfo ): string | undefined | null{
    switch (event) {
      case 'first':
        return pageInfo?.linkInfo?.linkFisrt;
      case 'last':
        return pageInfo?.linkInfo?.linkLast;
      case 'prev':
        return pageInfo?.linkInfo?.linkPrev;
      case 'next':
        return pageInfo?.linkInfo?.linkNext;
      default:
        return null;
    }
  }



  //constructor(protected name: string) { super(name) } 



  ngOnDestroy(): void {
   // this.console.debug('Destroy service')
  }

}
