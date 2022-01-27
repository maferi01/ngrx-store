import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { ListPostsComponent } from './pages/list-posts/list-posts.component';
import { CommentsService } from './services/comments.service';
import { PostsService } from './services/posts.service';
import { TableModule } from 'my-lib-display';


@NgModule({
  declarations: [
    ListPostsComponent
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    TableModule
  ],
  providers: [
    PostsService,
    CommentsService    
  ],
})
export class PostsModule { }
