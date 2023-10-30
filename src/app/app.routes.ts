import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from './services/authentication/auth.service';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/auth/signin/signin.page').then( p => p.SigninPage),
  },
  {
    path: 'dash',
    loadComponent: () => import('./pages/dashboard/home.page').then( p => p.HomePage),
    children:[
      {
        path: 'admin',
        canActivate: [AuthGuard],
        loadComponent: () => import('./components/dashboard/admin/admin.component').then(c => c.AdminComponent),
      },
      {
        path: 'driver',
        canActivate: [AuthGuard],
        loadComponent: () => import('./components/dashboard/driver/driver.component').then(c => c.DriverComponent),
      },
      {
        path: 'user',
        canActivate: [AuthGuard],
        loadComponent:  () => import('./components/dashboard/user/user.component').then(c => c.UserComponent),
      },
    ],
  },
  {
    path: 'travel',
    loadComponent: () => import('./pages/travel/travel.page').then( p => p.TravelPage),
    children:[
      {
        path: 'user',
        canActivate: [AuthGuard],
        loadComponent: () => import('./components/travel/user/user.component').then( c => c.UserComponent),
      },
    ],
  },
  {
    path: 'request',
    loadComponent: () => import('./pages/request/request.page').then( p => p.RequestPage),
    children: [
      {
        path: 'pending',
        canActivate: [AuthGuard],
        loadComponent: () => import('./components/request/pendingreq/pendingreq.component').then( c => c.PendingreqComponent),
      }
    ]
  },
  {
    path: 'pickrole',
    canActivate: [AuthGuard],
    loadComponent: () => import('./pages/auth/pickrole/pickrole.page').then( p => p.PickrolePage),
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    loadComponent: () => import('./pages/profile/user/profile.page').then( p => p.ProfilePage),
  },
  {
    path: 'form/conductor',
    canActivate: [AuthGuard],
    loadComponent: () => import('./pages/form/driver/driver.page').then( p => p.DriverPage)
  },
  {
    path: 'map',
    canActivate: [AuthGuard],
    loadComponent: () => import('./components/travel/map/map.page').then( p => p.MapPage)
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