import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponentDemo } from './app.component';

const routes: Routes = [
  {path:'',component: AppComponentDemo}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemoLibRoutingModule { }
