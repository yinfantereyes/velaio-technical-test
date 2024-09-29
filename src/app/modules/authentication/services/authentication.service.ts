import { Injectable } from '@angular/core';
import {catchError, mergeMap, Observable, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {LoginRequest} from "../../../shared/models/task";
import {map} from "rxjs/operators";
import {ApiCodeMessage} from "../../../shared/consts/api-code-message.constant";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
    public accessToken: string;
    public tokenRefresh: string;

    constructor(private _http: HttpClient) { }

    handleError(error: HttpErrorResponse) {
        let mensajeError = undefined;
        if (error.error instanceof ErrorEvent) {
            console.error('Error:', error.error.message);
            mensajeError = `Error: ${error.error.message}`;
        } else {
            switch (error.status) {
                case 400:
                    console.error(`Error del backend, código: ${error.status}, `);
                    mensajeError = error.error.error;
                    break;
                case 500:
                    console.error(`Error del backend, código: ${error.status} `);
                    break;
                case 503:
                    console.error(`Error del backend, código: ${error.status} `);
                    mensajeError = ApiCodeMessage.MSG_CODE_503;
                    break;
                default:
                    console.error(`Error: ${error} `);
                    mensajeError = error;
                    break;
            }
        }
        return throwError(mensajeError);
    }

    /** Login */
    login(loginRequest: LoginRequest): Observable<any> {
        const headers = new HttpHeaders({
            accept: 'application/json',
        });

        return this._http
            .post<any>(environment.serviceLogin, loginRequest, {
                headers,
            })
            .pipe(
                map((res) => res),
                catchError(this.handleError)
            );
    }
}
