import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './dashboard/components/admin/admin.component';
import { DriverComponent } from './dashboard/components/driver/driver.component';
import { UserComponent } from './dashboard/components/user/user.component';
import { TDriverComponent } from './travel/components/driver/driver.component';
import { NgModule } from '@angular/core';
import { TUserComponent } from './travel/components/user/user.component';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/signin/signin.page').then( m => m.SigninPage),
  },
  {
    path: 'dash',
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
    path: 'travel',
    loadComponent: () => import('./travel/view/travel.page').then( m => m.TravelPage),
    children:[
      {
        path: 'driver',
        component: TDriverComponent,
      },
      {
        path: 'user',
        component: TUserComponent,
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
    loadComponent: () => import('./login/pickrole/pickrole.page').then( m => m.PickrolePage),
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