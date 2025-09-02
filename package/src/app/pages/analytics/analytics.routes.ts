import { Routes } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-analytics-summary',
  standalone: true,
  template: '<div class="p-24">Analytics / Summary</div>'
})
export class AnalyticsSummaryComponent {}

@Component({
  selector: 'app-analytics-files',
  standalone: true,
  template: '<div class="p-24">Analytics / Files</div>'
})
export class AnalyticsFilesComponent {}

@Component({
  selector: 'app-analytics-incidents',
  standalone: true,
  template: '<div class="p-24">Analytics / Scan Incidents</div>'
})
export class AnalyticsIncidentsComponent {}

@Component({
  selector: 'app-analytics-queries',
  standalone: true,
  template: '<div class="p-24">Analytics / Queries</div>'
})
export class AnalyticsQueriesComponent {}

export const AnalyticsRoutes: Routes = [
  { path: 'summary', component: AnalyticsSummaryComponent },
  { path: 'files', component: AnalyticsFilesComponent },
  { path: 'incidents', component: AnalyticsIncidentsComponent },
  { path: 'queries', component: AnalyticsQueriesComponent },
  { path: '', redirectTo: 'summary', pathMatch: 'full' },
];
