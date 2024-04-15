import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GetLogService {
  private apiUrl = 'http://localhost:3000/logs'; // Adjust the URL according to your API endpoint

  constructor(private http: HttpClient) { }

  getLogs(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error fetching logs:', error);
        return throwError('Something went wrong while fetching logs. Please try again later.');
      })
    );
  }
}
