import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { Submission } from '../shared/submission.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubmissionService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private authService: AuthService) { }

  public submit(appId: string, file: File): Observable<Submission> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.authService.getAuthorizationHeader().pipe(flatMap(headers => {
      return this.http.post<Submission>(this.baseUrl + '/submissions/' + appId, formData, { headers: headers });
    }));
  }

  public getSubmissions(appId: string): Observable<Submission[]> {
    return this.authService.getAuthorizationHeader().pipe(flatMap(headers => {
      return this.http.get<Submission[]>(this.baseUrl + '/submissions/' + appId, { headers: headers });
    }));
  }

  public getSubmission(appId: string, requestId: string): Observable<Submission> {
    const body = { 'request_id': requestId };
    return this.authService.getAuthorizationHeader().pipe(flatMap(headers => {
      return this.http.get<Submission>(this.baseUrl + '/submissions/' + appId, { headers: headers, params: body });
    }));
  }
}
