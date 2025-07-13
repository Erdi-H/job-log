import { Routes } from '@angular/router';
import { JobsList } from './components/jobs-list/jobs-list';
import { Analytics } from './components/analytics/analytics';

export const routes: Routes = [
    { path: '', component: JobsList },
    { path: 'analytics', component: Analytics }
];