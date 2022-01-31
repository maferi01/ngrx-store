import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ComplexFieldsModule, FieldsModule, FormModule, MaterialFieldsModule, PaginatorModule, SpinnerModule, TableModule } from 'my-lib-display';
import { ListPostsComponent } from './pages/list-posts/list-posts.component';
import { PostsRoutingModule } from './posts-routing.module';
import { PostsService } from './services/posts.service';
import { PostsEffects } from './store/effects/posts.effects';
import * as fromPosts from './store/reducers/posts.reducer';



@NgModule({
  declarations: [
    ListPostsComponent
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    FormModule,
    FieldsModule,
    ComplexFieldsModule,
    MaterialFieldsModule,
    TableModule,
    SpinnerModule,
    PaginatorModule,
    StoreModule.forFeature(fromPosts.postsFeatureKey, fromPosts.reducer),
    EffectsModule.forFeature([PostsEffects])
  ],
  providers: [
    PostsService,

  ],
})
export class PostsModule { }
