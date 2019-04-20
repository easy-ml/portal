import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError, tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

import { Token } from '../shared/token.model';
import { throwError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  };

  public isAuthenticated(): boolean {
    console.log(this.jwtHelper.isTokenExpired(this.accessToken));
    return !this.jwtHelper.isTokenExpired(this.accessToken);
  }

  public signIn(username: string, password: string): Observable<Token> {
    return this.http.post<Token>(this.baseUrl + '/auth/login', { username, password })
      .pipe(
        tap((token: Token) => {
          this.accessToken = token.access_token;
          this.refreshToken = token.refresh_token;
        }),
        catchError(this.handleError)
      );
  }

  get accessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  set accessToken(accessToken) {
    localStorage.setItem('access_token', accessToken);
  }

  get refreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  }

  set refreshToken(refreshToken) {
    localStorage.setItem('refresh_token', refreshToken);
  }
}
