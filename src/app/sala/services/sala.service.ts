import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { BaseService } from 'src/app/services/base.service';
import { catchError, map } from "rxjs/operators";
import { Agendamento } from '../models/agendamento';

@Injectable()
export class SalaService extends BaseService{
    constructor(private http: HttpClient) {super();}

    AgendarSala(agendamento: Agendamento): Observable<Agendamento>{
        let response = this.http.
            post(this.UrlServiceV1 + 'sala/agendar',agendamento, this.ObterHeaderJason())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;
    }

    ListarSalas(): Observable<Agendamento[]>{        
        return this.http
                .get<Agendamento[]>(this.UrlServiceV1 + 'sala/agendar')
                .pipe(catchError(super.serviceError));
    }
}