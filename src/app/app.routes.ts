import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/auth/signin/signin.page').then( m => m.SigninPage),
  },
  {
    path: 'dash',
    loadComponent: () => import('./pages/dashboard/home.page').then( m => m.HomePage),
    children:[
      {
        path: 'admin',
        loadComponent: () => import('./components/dashboard/admin/admin.component').then(m => m.AdminComponent),
      },
      {
        path: 'driver',
        loadComponent: () => import('./components/dashboard/driver/driver.component').then(m => m.DriverComponent),
      },
      {
        path: 'user',
        loadComponent:  () => import('./components/dashboard/user/user.component').then(m => m.UserComponent),
      },
    ],
  },
  {
    path: 'travel',
    loadComponent: () => import('./pages/travel/travel.page').then( m => m.TravelPage),
    children:[
      {
        path: 'driver',
        loadComponent: () => import('./components/travel/driver/driver.component').then( m => m.DriverComponent),
      },
      {
        path: 'user',
        loadComponent: () => import('./components/travel/user/user.component').then( m => m.UserComponent),
      },
    ],
  },
  {
    path:'recoverPass',
    loadComponent: () => import('./pages/auth/recoverpass/recoverpass.page').then( m => m.RecoverpassPage),
  },
  {
    path: 'signin',
    loadComponent: () => import('./pages/auth/signin/signin.page').then( m => m.SigninPage),
  },
  {
    path: 'pickrole',
    loadComponent: () => import('./pages/auth/pickrole/pickrole.page').then( m => m.PickrolePage),
  },
  {
    path: 'resetpass',
    loadComponent: () => import('./pages/auth/resetpass/resetpass.page').then( m => m.ResetpassPage)
  },
  {
    path: 'map',
    loadComponent: () => import('./components/travel/map/map.page').then( m => m.MapPage)
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