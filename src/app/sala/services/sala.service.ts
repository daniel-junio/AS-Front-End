import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { BaseService } from 'src/app/services/base.service';
import { catchError, map } from "rxjs/operators";
import { Agendamento } from '../models/agendamento';

@Injectable()
export class SalaService extends BaseService{
    constructor(private http: HttpClient) {super();}

    AgendarSala(agendamento: Agendamento){
        let response = this.http.
            post(this.UrlServiceV1 + 'agendamentos/criar',agendamento)
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));
        return response;
    }
    ListarSalasAgendamentos(): Observable<Agendamento[]>{        
        return this.http
                .get<Agendamento[]>(this.UrlServiceV1 + 'agendamentos')
                .pipe(catchError(super.serviceError));
    }
}