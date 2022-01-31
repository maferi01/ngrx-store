import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { FilterPost, IResponsePosts, Post } from '../models/models';
import { AbstractEntityService } from '../../services/base/abstract.entity.service';
import { NamesLog } from 'src/app/services/utils/names-classes';
import { NameLog } from 'src/app/services/utils/logger';
import { FilterListInfo, PageRequest, SortInfo } from '../../services/models/filter.model';

@Injectable()
@NameLog(NamesLog.PostsService)
export class PostsService extends AbstractEntityService<Post> {
  constructor(injector: Injector) {
    super(injector, environment.urlHostApi, '/posts');
  }

  getPosts(filterPost:FilterPost,sortInfo:SortInfo,pageRequest:PageRequest): Observable<IResponsePosts> {
    
    return this.getEntities(sortInfo,pageRequest, (params) => {
      if (filterPost?.author) {
        params = params.append('author_like', filterPost.author);
      }
      if (filterPost?.title) {
        params = params.append('title_like', filterPost.title);
      }
      return params;
    }).pipe(map((resp) => ({ link: resp.headers.get('link'), data: resp.body } as IResponsePosts)));
  }
}
