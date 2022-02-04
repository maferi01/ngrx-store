import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ButtonModule, ComplexFieldsModule, DialogModule, FieldsModule, FormModule, MaterialFieldsModule, PaginatorModule, SpinnerModule, TableModule } from 'my-lib-display';
import { ListPostsComponent } from './pages/list-posts/list-posts.component';
import { PostsRoutingModule } from './posts-routing.module';
import { CommentsService } from './services/comments.service';
import { PostsService } from './services/posts.service';
import { PostsEffects } from './store/effects/posts.effects';
import * as fromIndex from './store/reducers';
import { ListCommentsComponent } from './pages/list-comments/list-comments.component';
import { CommentsEffects } from './store/effects/comments.effects';
import { LoadingEffects } from './store/effects/loading.effects';
import { FormCommentModule } from './components/form-comment/form.comment.module';



@NgModule({
  declarations: [
    ListPostsComponent,
    ListCommentsComponent,
  //  FormCommentComponent
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    FormModule,
    MaterialFieldsModule,
    TableModule,
    SpinnerModule,
    PaginatorModule,
    ButtonModule,
    DialogModule,
    FormCommentModule,
    StoreModule.forFeature(fromIndex.postsStateFeatureKey, fromIndex.reducers),
    EffectsModule.forFeature([PostsEffects,CommentsEffects,LoadingEffects])
  ],
  providers: [
    PostsService,CommentsService

  ],
})
export class PostsModule { }
