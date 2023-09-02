import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'admin',
    loadComponent: () => import('./admin/admin.page').then( m => m.AdminPage)
  },
  {
    path: 'user',
    loadComponent: () => import('./user/user.page').then( m => m.UserPage)
  },
  {
    path:'recoverPass',
    loadComponent: () => import('./recover-pass/recover-pass.page').then( m => m.RecoverPassPage)
  },
  {
    path: '**',
    redirectTo: 'login',
  }

];
