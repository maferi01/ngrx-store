import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AbstractEntityService } from 'src/app/shared/services/base/abstract.entity.service';
import { SortInfo, PageRequest, IResponseData } from 'src/app/shared/store/filter.list.model';
import { NameLog } from 'src/app/shared/utils/logger';
import { NamesLog } from 'src/app/shared/utils/names-classes';
import { rxZod } from 'src/app/shared/utils/zodrx';
import { environment } from 'src/environments/environment';
import { FilterPost, Post, PostRespXsd } from '../models/models';


@Injectable()
@NameLog(NamesLog.PostsService)
export class PostsService extends AbstractEntityService<Post> {
  constructor(injector: Injector) {
    super(injector, environment.urlHostApi, '/posts');
  }

  getPosts(filterPost:FilterPost,sortInfo:SortInfo,pageRequest:PageRequest): Observable<IResponseData<Post>> {
   // consoleApp(this).log('Enter get Posts');
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
