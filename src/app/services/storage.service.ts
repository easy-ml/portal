import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Uploaded } from '../shared/uploaded.model';
import { flatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private baseUrl = environment.baseUrl;
  constructor(private http: HttpClient, private authService: AuthService) { }

  upload(file: File): Observable<Uploaded> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.authService.getAuthorizationHeader().pipe(flatMap(headers => {
      return this.http.post<Uploaded>(this.baseUrl + '/storage', formData, { headers: headers });
    }));
  }
  
}
