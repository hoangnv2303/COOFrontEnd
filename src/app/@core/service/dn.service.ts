import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { DNData } from '../models/dn';
import { DataTablesResponse } from '../models/datatables';

@Injectable()
export class DNService extends DNData {

    readonly dnURL = environment.apiUrl + '/api/dn/';

    constructor(private http: HttpClient) {
        super();
    }
    getDN(dtParameter: any): Observable<DataTablesResponse> {
        return this.http.post<DataTablesResponse>(this.dnURL + 'all-list',
            dtParameter).pipe(catchError(this.handleError));
    }
    getDNManual(dtParameter: any, type: string): Observable<DataTablesResponse> {
        return this.http.post<DataTablesResponse>(this.dnURL + 'list-manual/' + type,
            dtParameter).pipe(catchError(this.handleError));
    }
    handleError(error: HttpErrorResponse) {
        return throwError(error);
    }
}
