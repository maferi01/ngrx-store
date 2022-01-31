import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NameLog } from 'src/app/services/utils/logger';
import { NamesLog } from 'src/app/services/utils/names-classes';
import { environment } from 'src/environments/environment';
import { AbstractEntityService } from '../../services/base/abstract.entity.service';
import { IResponseData, PageRequest, SortInfo } from '../../services/models/filter.model';
import { Comment, FilterComment, IResponseComments } from '../models/comment';


@Injectable()
@NameLog(NamesLog.CommentsService)
export class CommentsService extends AbstractEntityService<Comment> {
  constructor(injector: Injector) {
    super(injector, environment.urlHostApi, '/comments');
  }

  getComments(filterComment:FilterComment,sortInfo:SortInfo,pageRequest:PageRequest): Observable<IResponseData<Comment>> {
    
    return this.getEntities(sortInfo,pageRequest, (params) => {
      if (filterComment?.author) {
        params = params.append('author_like', filterComment.author);
      }
      if (filterComment?.comment) {
        params = params.append('comment_like', filterComment.comment);
      }
      return params;
    }).pipe(map((resp) => ({ link: resp.headers.get('link'), data: resp.body })));
  }
}
