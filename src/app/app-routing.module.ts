import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './navegacao/home/home.component';
import { NotFoundComponent } from './navegacao/not-found/not-found.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch:'full'},
  {path: 'home',component: HomeComponent},
  {path: 'sala',
   loadChildren: ()=>import('./sala/sala.module')
    .then(m => m.SalaModule)
  },
  { path: 'nao-encontrado', component: NotFoundComponent},
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
