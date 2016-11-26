import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'store', pathMatch: 'full' },
    { path: '**', redirectTo: 'pages/dashboard' }
];

export const routing = RouterModule.forRoot(routes, { useHash: true });
