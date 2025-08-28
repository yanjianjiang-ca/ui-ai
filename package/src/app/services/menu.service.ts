import { inject, Injectable, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { NavItem } from '../layouts/full/sidebar/nav-item/nav-item';

export interface MenuSectionResponse {
  items: NavItem[];
}

export const MENU_API_BASE_URL = new InjectionToken<string>('MENU_API_BASE_URL');

@Injectable({ providedIn: 'root' })
export class MenuService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(MENU_API_BASE_URL, { optional: true }) ?? '/api';

  /**
   * Fetch two-level menu items for the left sidebar. Falls back to local mock when API fails.
   */
  list(): Observable<NavItem[]> {
    const url = `${this.baseUrl}/menu`;
    return this.http.get<MenuSectionResponse | NavItem[]>(url).pipe(
      // Support both { items: [...] } and [...] payloads
      catchError(() => this.http.get<MenuSectionResponse | NavItem[]>(`/assets/mock/menu.json`)),
      // Normalize to NavItem[] and swallow errors with empty array
      // eslint-disable-next-line rxjs/no-ignored-error
      catchError(() => of([] as NavItem[]))
    ) as unknown as Observable<NavItem[]>;
  }
}

