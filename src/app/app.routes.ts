import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './dashboard/components/admin/admin.component';
import { DriverComponent } from './dashboard/components/driver/driver.component';
import { UserComponent } from './dashboard/components/user/user.component';
import { UserModel } from './models/user/UserModel';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/signin/signin.page').then( m => m.SigninPage),
  },
  {
    path: '',
    loadComponent: () => import('./dashboard/home/home.page').then( m => m.HomePage),
    children:[
      {
        path: 'admin',
        component: AdminComponent,
      },
      {
        path: 'driver',
        component: DriverComponent,
      },
      {
        path: 'user',
        component: UserComponent,
      },
    ],
  },
  {
    path:'recoverPass',
    loadComponent: () => import('./login/recoverpass/recoverpass.page').then( m => m.RecoverpassPage),
  },
  {
    path: 'signin',
    loadComponent: () => import('./login/signin/signin.page').then( m => m.SigninPage),
  },
  {
    path: 'pickrole',
    loadComponent: () => import('./dashboard/pickrole/pickrole.page').then( m => m.PickrolePage),
  },
  {
    path: 'resetpass',
    loadComponent: () => import('./login/resetpass/resetpass.page').then( m => m.ResetpassPage)
  },
  {
    path: '**',
    redirectTo: 'login',
  },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }