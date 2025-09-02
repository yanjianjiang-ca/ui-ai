import { Routes } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-discovery-storages',
  standalone: true,
  template: '<div class="p-24">Discovery / Storages</div>'
})
export class DiscoveryStoragesComponent {}

@Component({
  selector: 'app-discovery-identities',
  standalone: true,
  template: '<div class="p-24">Discovery / Identities</div>'
})
export class DiscoveryIdentitiesComponent {}

@Component({
  selector: 'app-discovery-data-types',
  standalone: true,
  template: '<div class="p-24">Discovery / Data Types</div>'
})
export class DiscoveryDataTypesComponent {}

@Component({
  selector: 'app-discovery-logs-reports',
  standalone: true,
  template: '<div class="p-24">Discovery / Logs & Reports</div>'
})
export class DiscoveryLogsReportsComponent {}

@Component({
  selector: 'app-discovery-fabric',
  standalone: true,
  template: '<div class="p-24">Discovery / Fabric</div>'
})
export class DiscoveryFabricComponent {}

@Component({
  selector: 'app-discovery-system',
  standalone: true,
  template: '<div class="p-24">Discovery / System</div>'
})
export class DiscoverySystemComponent {}

@Component({
  selector: 'app-discovery-notifications',
  standalone: true,
  template: '<div class="p-24">Discovery / Notifications</div>'
})
export class DiscoveryNotificationsComponent {}

export const DiscoveryRoutes: Routes = [
  { path: 'storages', component: DiscoveryStoragesComponent },
  { path: 'identities', component: DiscoveryIdentitiesComponent },
  { path: 'data-types', component: DiscoveryDataTypesComponent },
  { path: 'logs-reports', component: DiscoveryLogsReportsComponent },
  { path: 'fabric', component: DiscoveryFabricComponent },
  { path: 'system', component: DiscoverySystemComponent },
  { path: 'notifications', component: DiscoveryNotificationsComponent },
  { path: '', redirectTo: 'storages', pathMatch: 'full' },
];
