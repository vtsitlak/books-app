import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  {
      path: 'notes',
      loadChildren: () => import('./notes/notes.module').then(m => m.NotesModule),
      canActivate: [AuthGuard]
  },
  {
      path: '**',
      redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
