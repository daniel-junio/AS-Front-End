import { Component, OnInit } from '@angular/core';
import { Agendamento } from '../models/agendamento';
import { SalaService } from '../services/sala.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})

export class ListaComponent implements OnInit {

  constructor(private salaservice: SalaService) { }

  public agendamentos : Agendamento[];
  errorMessage: string;

  ngOnInit(): void {
    this.consultarAgendamentos();
   
  }
  consultarAgendamentos() {
    this.salaservice.ListarSalasAgendamentos()
    
    .subscribe(
      salas =>{
        salas.forEach(element => {
          element.horaFim = new Date(element.horaFim.toString());
      });
        this.agendamentos = salas
      }, 
      error => this.errorMessage = error);
  }

}
