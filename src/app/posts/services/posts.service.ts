import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { FilterPost, IResponsePosts, Post } from '../models/models';
import { AbstractEntityService } from '../../services/base/abstract.entity.service';
import { NamesLog } from 'src/app/services/utils/names-classes';
import { NameLog } from 'src/app/services/utils/logger';
import { FilterList } from '../../services/models/filter.model';

@Injectable()
@NameLog(NamesLog.PostsService)
export class PostsService extends AbstractEntityService<Post> {
  constructor(injector: Injector) {
    super(injector, environment.urlHostApi, '/posts');
  }

  getPosts(filterList?: FilterList<FilterPost>): Observable<IResponsePosts> {
    
    return this.getEntities(filterList, (params) => {
      if (filterList.filter && filterList.filter.author) {
        params = params.append('author_like', filterList.filter.author);
      }
      if (filterList.filter && filterList.filter.title) {
        params = params.append('title_like', filterList.filter.title);
      }
      return params;
    }).pipe(map((resp) => ({ link: resp.headers.get('link'), posts: resp.body } as IResponsePosts)));
  }
}
