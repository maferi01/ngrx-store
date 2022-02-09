import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { consoleApp, NameLog } from 'src/app/services/utils/logger';
import { NamesLog } from 'src/app/services/utils/names-classes';
import { rxZod } from 'src/app/services/utils/zodrx';
import { environment } from 'src/environments/environment';
import { AbstractEntityService } from '../../services/base/abstract.entity.service';
import { IResponseData, PageRequest, SortInfo } from '../../services/models/filter.model';
import { FilterPost, Post, PostRespXsd } from '../models/models';


@Injectable()
@NameLog(NamesLog.PostsService)
export class PostsService extends AbstractEntityService<Post> {
  constructor(injector: Injector) {
    super(injector, environment.urlHostApi, '/posts');
  }

  getPosts(filterPost:FilterPost,sortInfo:SortInfo,pageRequest:PageRequest): Observable<IResponseData<Post>> {
    consoleApp(this).log('Enter get Posts');
    return this.getEntities(sortInfo,pageRequest, (params) => {
      if (filterPost?.author) {
        params = params.append('author_like', filterPost.author);
      }
      if (filterPost?.title) {
        params = params.append('title_like', filterPost.title);
      }
      return params;
    }).pipe(
      rxZod(PostRespXsd),
      map((resp) => ({ link: resp.headers.get('link'), data: resp.body })));
  }
}
