import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MixComponent } from './components/mix/mix.component';
import { UsersComponent } from './components/users/users.component';
import { UsersRoutingModule } from './users-routing.module';



@NgModule({
  declarations: [
    UsersComponent,
    MixComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
