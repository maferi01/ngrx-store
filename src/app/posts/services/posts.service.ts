import { Injectable, Injector } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { NameLog } from 'src/app/services/utils/logger';
import { NamesLog } from 'src/app/services/utils/names-classes';
import { rxZod } from 'src/app/services/utils/zodrx';
import { environment } from 'src/environments/environment';
import { AbstractEntityService } from '../../services/base/abstract.entity.service';
import { IResponseData, PageRequest, SortInfo } from '../../services/models/filter.model';
import { CommentRespXsd } from '../models/comment';
import { FilterPost, Post } from '../models/models';


@Injectable()
@NameLog(NamesLog.PostsService)
export class PostsService extends AbstractEntityService<Post> {
  constructor(injector: Injector) {
    super(injector, environment.urlHostApi, '/posts');
  }

  getPosts(filterPost:FilterPost,sortInfo:SortInfo,pageRequest:PageRequest): Observable<IResponseData<Post>> {
    
    return this.getEntities(sortInfo,pageRequest, (params) => {
      if (filterPost?.author) {
        params = params.append('author_like', filterPost.author);
      }
      if (filterPost?.title) {
        params = params.append('title_like', filterPost.title);
      }
      return params;
    }).pipe(
    //  mergeMap(resp=> of(resp.body).pipe(rxZod(CommentRespXsd),map(()=> resp))),
      map((resp) => ({ link: resp.headers.get('link'), data: resp.body })));
  }
}
