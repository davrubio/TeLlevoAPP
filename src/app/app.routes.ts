import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/signin/signin.page').then( m => m.SigninPage)
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
    loadComponent: () => import('./login/recoverpass/recoverpass.page').then( m => m.RecoverpassPage)
  },
  {
    path: '**',
    redirectTo: 'login',
  },
  {
    path: 'signin',
    loadComponent: () => import('./login/signin/signin.page').then( m => m.SigninPage)
  },


];
