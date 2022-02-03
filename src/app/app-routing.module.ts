import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageErrorComponent } from './page-error/page-error.component';

const routes: Routes = [
  { path: 'demo', loadChildren: () => import('./demo-lib/demo-lib.module').then(m => m.DemoLibModule)},
  { path: 'posts', loadChildren: () => import('./posts/posts.module').then(m => m.PostsModule)},
  { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule)},
  { path: 'error', component: PageErrorComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
