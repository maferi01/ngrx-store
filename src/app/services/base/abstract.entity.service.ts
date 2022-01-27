import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { FilterList, PageInfo } from 'src/app/services/models/filter.model';

import { Entity } from '../models/models';
import { AbstractService } from './abstract.service';


export abstract class AbstractEntityService<E extends Entity> extends AbstractService {
  protected httpClient: HttpClient;
  constructor(protected override injector: Injector, protected urlHost: string, protected pathEntity: string) {
    super();
    this.httpClient = this.injector.get(HttpClient);
  }

  getEntities<F>(filterList: FilterList<F>, fnParams: (params: HttpParams) => HttpParams): Observable<HttpResponse<any>> {
    let urlPosts = this.urlEntity;

    let params = new HttpParams();
    if (filterList) {
      if (filterList.page && filterList.page.requestLink) {
        urlPosts = this.getLink(filterList.page);
      } else {
        params = fnParams(params);
        if (filterList.page && filterList.page.pageIndex) {
          params = params.append('_page', filterList.page.pageIndex.toString());
        }
        if (filterList.page && filterList.page.pageSize) {
          params = params.append('_limit', filterList.page.pageSize.toString());
        }

        if (filterList.order) {
          params = params.append('_sort', filterList.order.active);
          params = params.append('_order', filterList.order.direction);
        }
      }
    }

    return this.httpClient.get(urlPosts, { params, observe: 'response' });
  
  }


  getEntitiesList<F,R>(pathUrl?:string,filterList?: FilterList<F>, fnParams?: (params: HttpParams) => HttpParams): Observable<R> {
    let urlList = `${this.urlHost}${pathUrl || this.pathEntity}`;

    let params = new HttpParams();
    if (filterList) {
      if (filterList.page && filterList.page.requestLink) {
        urlList = this.getLink(filterList.page);
      } else {
        params = fnParams(params);
        if (filterList.page && filterList.page.pageIndex) {
          params = params.append('_page', filterList.page.pageIndex.toString());
        }
        if (filterList.page && filterList.page.pageSize) {
          params = params.append('_limit', filterList.page.pageSize.toString());
        }

        if (filterList.order) {
          params = params.append('_sort', filterList.order.active);
          params = params.append('_order', filterList.order.direction);
        }
      }
    }

    return this.httpClient.get<R>(urlList, { params });
  
  }

  protected getLink(pageInfo: PageInfo): string {
    switch (pageInfo.requestLink) {
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

  addEntity(entity: E): Observable<E> {
    return this.httpClient.post<E>(this.urlEntity, entity);
  }

  updateEntity(entity: E): Observable<E> {
    return this.httpClient.put<E>(`${this.urlEntity}/${entity.id}`, entity);
  }

  deleteEntity(entity: E): Observable<E> {
    return this.httpClient.delete<E>(`${this.urlEntity}/${entity.id}`);
  }

  get urlEntity(): string {
    return `${this.urlHost}${this.pathEntity}`;
  }
}