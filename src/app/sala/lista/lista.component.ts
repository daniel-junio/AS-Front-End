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
          element.horaInicio = this.JSONTimeSpanToString(element.horaInicio);
          element.horaFim = this.JSONTimeSpanToString(element.horaFim);
      });
        this.agendamentos = salas
      }, 
      error => this.errorMessage = error);
  }

  JSONTimeSpanToString(timespan: any) {
    if (!timespan) { return null; }
    const hours: string = timespan.hours < 10 ? `0${timespan.hours}` : timespan.hours;
    const minutes: string = timespan.minutes < 10 ? `0${timespan.minutes}` : timespan.minutes;
    const seconds: string = timespan.seconds < 10 ? `0${timespan.seconds}` : timespan.seconds;
    return `${hours}:${minutes}:${seconds}`;
  }
}
