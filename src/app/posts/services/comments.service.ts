import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AbstractEntityService } from 'src/app/shared/services/base/abstract.entity.service';
import { SortInfo, PageRequest, IResponseData } from 'src/app/shared/services/models/filter.model';
import { NameLog } from 'src/app/shared/utils/logger';
import { NamesLog } from 'src/app/shared/utils/names-classes';
import { rxZod } from 'src/app/shared/utils/zodrx';
import { environment } from 'src/environments/environment';
import { Comment, CommentRespXsd, FilterComment } from '../models/comment';


@Injectable()
@NameLog(NamesLog.CommentsService+'-NAME-LOG')
export class CommentsService extends AbstractEntityService<Comment> {
  constructor(injector: Injector) {
    super(injector, environment.urlHostApi, '/comments');
  }

  getComments(filterComment:FilterComment,sortInfo:SortInfo,pageRequest:PageRequest): Observable<IResponseData<Comment>> {
    
    //consoleApp(this).log('Enter get Comments');
    return this.getEntities(sortInfo,pageRequest, (params) => {
      if (filterComment?.author) {
        params = params.append('author_like', filterComment.author);
      }
      if (filterComment?.comment) {
        params = params.append('comment_like', filterComment.comment);
      }
      if (filterComment?.id) {
        params = params.append('id_like', filterComment.id);
      }

      return params;
    }).pipe(
    //  rxlogth(this,'info')('Data from get comments other'),      
      rxZod(CommentRespXsd),
      map((resp) => ({ link: resp.headers.get('link'), data: resp.body })));
  }
}
