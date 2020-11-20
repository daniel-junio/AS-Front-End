import { HttpErrorResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { IfStmt } from '@angular/compiler';
import { throwError } from 'rxjs';

export abstract class BaseService{
    protected UrlServiceV1: string = "https://localhost:5001/api/";

    protected ObterHeaderJason(){
        return{
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
    }
    protected extractData(response: any){
        return response.data || {};
    }

    protected serviceError(response: Response | any){
        let customError: String[] = [];

        if(response instanceof HttpErrorResponse){
            if(response.status !=200){
                response.error.errors = customError;
            }
        }
        console.error(response);
        return throwError(response);
    }
}