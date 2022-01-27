import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { ListPostsComponent } from './pages/list-posts/list-posts.component';
import { CommentsService } from './services/comments.service';
import { PostsService } from './services/posts.service';
import { SpinnerModule, TableModule } from 'my-lib-display';
import { StoreModule } from '@ngrx/store';
import * as fromPosts from './store/reducers/posts.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PostsEffects } from './store/effects/posts.effects';


@NgModule({
  declarations: [
    ListPostsComponent
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    TableModule,
    SpinnerModule,
    StoreModule.forFeature(fromPosts.postsFeatureKey, fromPosts.reducer),
    EffectsModule.forFeature([PostsEffects])
  ],
  providers: [
    PostsService,
    CommentsService    
  ],
})
export class PostsModule { }
