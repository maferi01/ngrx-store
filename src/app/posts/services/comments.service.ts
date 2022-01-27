import { HttpParams } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { NameLog } from 'src/app/services/utils/logger';
import { NamesLog } from 'src/app/services/utils/names-classes';
import { environment } from 'src/environments/environment';

import { AbstractEntityService } from '../../services/base/abstract.entity.service';
import { Comment, FilterComment, IResponseComments } from '../models/comment';
import { FilterList } from '../../services/models/filter.model';

@Injectable()
@NameLog(NamesLog.CommentsService)
export class CommentsService extends AbstractEntityService<Comment> {
  constructor(injector: Injector) {
    super(injector, environment.urlHostApi, '/comments');
  }

  getComments(filterList?: FilterList<FilterComment>): Observable<IResponseComments> {
    return this.getEntities(filterList, (params) => {
      if (filterList.filter && filterList.filter.author) {
        params = params.append('author_like', filterList.filter.author);
      }
      if (filterList.filter && filterList.filter.comment) {
        params = params.append('comment_like', filterList.filter.comment);
      }
      return params;
    }).pipe(map((resp) => ({ link: resp.headers.get('link'), comments: resp.body } as IResponseComments)));
  }
}
