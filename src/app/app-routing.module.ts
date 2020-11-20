import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './navegacao/home/home.component';
import { NotFoundComponent } from './navegacao/not-found/not-found.component';
import { ListaComponent } from './sala/lista/lista.component';

const routes: Routes = [
  {path: '', redirectTo: '/sala/lista', pathMatch:'full'},
  {path: 'lista',component: ListaComponent},
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
