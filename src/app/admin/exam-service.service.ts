import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExamServiceService {
  path: string = 'http://localhost:8085/';

  constructor(private httpClient: HttpClient) {}

  getData(url: string): Observable<any> {
    return this.httpClient.get(this.path + url);
  }

  insertData(url: string, obj: any): Observable<any> {
    return this.httpClient.post(this.path + url, obj);
  }

  updateData(url: string, obj: any): Observable<any> {
    return this.httpClient.put(this.path + url, obj);
  }

  deleteData(url: string): Observable<any> {
    return this.httpClient.delete(this.path + url);
  }
}
