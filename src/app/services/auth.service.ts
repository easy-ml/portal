import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpBackend, HttpHeaders } from '@angular/common/http';
import { retry, catchError, tap, flatMap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

import { Token } from '../shared/token.model';
import { throwError, Observable, forkJoin, using, of } from 'rxjs';
import { map } from 'rxjs/operators'
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.baseUrl;
  private jwtHelper: JwtHelperService;

  constructor(private http: HttpClient) {
    this.jwtHelper = new JwtHelperService();
  }

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
  }

  public isAuthenticated(): boolean {
    return !this.jwtHelper.isTokenExpired(this.accessToken);
  }

  private getHeader() {
    return new HttpHeaders({ 'Authorization': 'Bearer ' + this.accessToken });
  }

  public getAuthorizationHeader(): Observable<HttpHeaders> {
    if (this.accessToken) {
      if (!this.jwtHelper.isTokenExpired(this.accessToken)) {
        return of(this.getHeader());
      }
      if (!this.jwtHelper.isTokenExpired()) {
        return this.refresh().pipe(map(_ => this.getHeader()));
      };
      this.signOut();
    }
    return throwError('Not authorized');
  }

  public isAuthenticatedExtended() {
    if (!this.accessToken) {
      return of(false);
    }
    if (!this.jwtHelper.isTokenExpired(this.accessToken)) {
      return of(true);
    }
    if (this.jwtHelper.isTokenExpired(this.refreshToken)) {
      this.signOut();
      return of(false);
    }
    return this.refresh().pipe(map(_ => this.isAuthenticated()));
  }

  private refresh(): Observable<Token> {
    const refreshHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + this.refreshToken });
    return this.http.post<Token>(this.baseUrl + '/auth/refresh', null, { headers: refreshHeader }).pipe(
      tap(x => {
        this.accessToken = x.access_token;
      }),
      catchError(this.handleError)
    );
  }

  public get roles(): Array<string> {
    throw new Error('Method not implemented.');
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

  public signOut(): void {
    this.accessToken = null;
    this.refreshToken = null;
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
