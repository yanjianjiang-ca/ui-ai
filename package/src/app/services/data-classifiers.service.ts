import { inject, Injectable, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';

export type Sensitivity = 'Highly Confidential' | 'Restricted' | 'Internal' | 'Public' | 'Confidential';

export interface DataClassifier {
  id: string;
  name: string;
  sensitivity: Sensitivity;
  type: 'Simple' | 'Composite';
  policies: number;
  scans: number;
  createdBy: string;
  createdAt: string;
  notes?: string;
}

export const DATA_API_BASE_URL = new InjectionToken<string>('DATA_API_BASE_URL');

@Injectable({ providedIn: 'root' })
export class DataClassifiersService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(DATA_API_BASE_URL, { optional: true }) ?? '/api';

  list(): Observable<DataClassifier[]> {
    const url = `${this.baseUrl}/classifiers`;
    return this.http.get<DataClassifier[]>(url).pipe(
      // Fallback to local mock if API not available during development
      catchError(() => this.http.get<DataClassifier[]>(`/assets/mock/classifiers.json`).pipe(catchError(() => of([]))))
    );
  }
}

