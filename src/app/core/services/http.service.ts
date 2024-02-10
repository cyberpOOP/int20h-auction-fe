import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { environment } from '@env/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class HttpService {
    private baseUrl: string = environment.apiUrl;
    private headers: HttpHeaders;

    constructor(private httpClient: HttpClient) {
        console.log(environment);
        console.log(isDevMode());
        this.headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });

        const accessToken = localStorage.getItem('accessToken');

        if (accessToken) {
            this.headers = this.headers.set('Authorization', `Bearer ${accessToken}`);
        }
    }

    get<T>(url: string): Observable<T> {
        return this.httpClient.get<T>(this.buildUrl(url), { headers: this.headers }).pipe(catchError(this.handleError));
    }

    getById<T>(url: string, id: string | number) {
        return this.httpClient
            .get<T>(`${this.buildUrl(url)}/${id}`, { headers: this.headers })
            .pipe(catchError(this.handleError));
    }

    post<T>(url: string, resource: unknown) {
        return this.httpClient
            .post<T>(this.buildUrl(url), resource, { headers: this.headers })
            .pipe(catchError(this.handleError));
    }

    delete<T>(url: string, id: string | number, body?: T) {
        const options = {
            headers: this.headers,
            body: body,
        };

        return this.httpClient.delete(`${this.buildUrl(url)}/${id}`, options).pipe(catchError(this.handleError));
    }

    put<T>(url: string, resource: T) {
        return this.httpClient
            .put<T>(this.buildUrl(url), resource, { headers: this.headers })
            .pipe(catchError(this.handleError));
    }

    patch<T>(url: string, resource: T) {
        return this.httpClient
            .patch<T>(this.buildUrl(url), resource, { headers: this.headers })
            .pipe(catchError(this.handleError));
    }

    updateById<T>(url: string, id: string | number) {
        return this.httpClient
            .put<T>(this.buildUrl(url), id, { headers: this.headers })
            .pipe(catchError(this.handleError));
    }

    private handleError(err: HttpErrorResponse) {
        return throwError(() => err);
    }

    public buildUrl(url: string): string {
        return this.baseUrl + url;
    }
}
