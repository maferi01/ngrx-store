import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ButtonModule, ComplexFieldsModule, FieldsModule, FormModule, MaterialFieldsModule, PaginatorModule, SpinnerModule, TableModule } from 'my-lib-display';
import { ListPostsComponent } from './pages/list-posts/list-posts.component';
import { PostsRoutingModule } from './posts-routing.module';
import { CommentsService } from './services/comments.service';
import { PostsService } from './services/posts.service';
import { PostsEffects } from './store/effects/posts.effects';
import * as fromIndex from './store/reducers';
import { ListCommentsComponent } from './pages/list-comments/list-comments.component';
import { CommentsEffects } from './store/effects/comments.effects';



@NgModule({
  declarations: [
    ListPostsComponent,
    ListCommentsComponent
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
    StoreModule.forFeature(fromIndex.postsStateFeatureKey, fromIndex.reducers),
    EffectsModule.forFeature([PostsEffects,CommentsEffects])
  ],
  providers: [
    PostsService,CommentsService

  ],
})
export class PostsModule { }
