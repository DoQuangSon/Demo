import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: 'login',
      loadChildren: './login/login.module#LoginModule'
    },
    {
      path: 'change-password',
      loadChildren: './change-password/change-password.module#ChangePasswordModule'
    }
  ])],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
