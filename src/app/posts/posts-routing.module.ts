import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCommentsComponent } from './pages/list-comments/list-comments.component';
import { ListPostsComponent } from './pages/list-posts/list-posts.component';

const routes: Routes = [
  {path:'',component: ListPostsComponent},
  {path:'comments',component: ListCommentsComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
