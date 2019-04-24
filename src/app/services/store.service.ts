import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { App } from '../shared/app.model';
import { AuthService } from './auth.service';
import { flatMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private baseUrl = environment.baseUrl;
  constructor(private http: HttpClient, private authService: AuthService) { }

  public getApps(): Observable<{ count: number, items: App[] }> {
    return this.authService.getAuthorizationHeader().pipe(flatMap(headers => {
      return this.http.get<{ count: number, items: App[] }>(this.baseUrl + '/apps', { headers: headers })
        .pipe(map((apps => {
          apps.items.forEach(app => {
            if (!app.cover.startsWith('http')) {
              app.cover = this.baseUrl + '/storage/' + app.cover;
            }
          });
          return apps;
        })));
    }));
  }

  public getApp(id: string): Observable<App> {
    return this.authService.getAuthorizationHeader().pipe(flatMap(headers => {
      return this.http.get<App>(this.baseUrl + '/apps/' + id, { headers: headers }).pipe(map(app => {
        if (!app.cover.startsWith('http')) {
          app.cover = this.baseUrl + '/storage/' + app.cover;
        }
        return app;
      }));
    }));
  }

  public publish(app: any): Observable<{ _id: string }> {
    return this.authService.getAuthorizationHeader().pipe(flatMap(headers => {
      return this.http.post<{ _id: string }>(this.baseUrl + '/apps', app, { headers: headers });
    }));
  }
}
