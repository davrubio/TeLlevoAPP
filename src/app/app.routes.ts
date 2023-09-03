import { Routes } from '@angular/router';
import { AdminComponent } from './dashboard/components/admin/admin.component';
import { DriverComponent } from './dashboard/components/driver/driver.component';
import { UserComponent } from './dashboard/components/user/user.component';

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
    path: '**',
    redirectTo: 'login',
  },
];
