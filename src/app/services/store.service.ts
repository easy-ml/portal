import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { App } from '../shared/app.model';
import { AuthService } from './auth.service';
import { flatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private baseUrl = environment.baseUrl;
  constructor(private http: HttpClient, private authService: AuthService) { }

  public getApps(): Observable<{count: number, items: App[]}> {
    return this.authService.getAuthorizationHeader().pipe(flatMap(headers => {
      return this.http.get<{count: number, items: App[]}>(this.baseUrl + '/apps', { headers: headers });
    }));
  }
}
