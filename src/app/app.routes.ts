import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./tarefas/tarefas.page').then( m => m.TarefasPage)
  },  
  
];
