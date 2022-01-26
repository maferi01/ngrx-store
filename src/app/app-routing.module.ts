import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'demo', loadChildren: () => import('./demo-lib/demo-lib.module').then(m => m.DemoLibModule)},
  { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
