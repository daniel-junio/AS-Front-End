import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr/toastr/toastr.module';
import { SalaRoutingModule } from './sala.route';
import { ListaComponent } from './lista/lista.component';
import { AgendamentoComponent } from './agendamento/agendamento.component';
import { SalaAppComponent } from './sala.app.component';
import { SalaService } from './services/sala.service';


@NgModule({
  declarations: [
    SalaAppComponent,
    ListaComponent,
    AgendamentoComponent],
  imports: [
    CommonModule,
    RouterModule,
    SalaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot()
  ],
  providers:[
    SalaService
  ]
})
export class SalaModule { }
