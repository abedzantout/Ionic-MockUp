import { Routes, RouterModule }  from '@angular/router';
import { Pages } from './pages.component';
// noinspection TypeScriptValidateTypes
const routes: Routes = [
    {
      path: 'login',
      loadChildren: () => System.import('./login/login.module')
    },
    {
      path: 'register',
      loadChildren: () => System.import('./register/register.module')
    },

    {
        path: 'upload',
        loadChildren: () => System.import('./uploadPage/uploadPage.module')
    },

    { path: 'store', loadChildren: () => System.import('./store/store.module') },
    { path: 'apkForm', loadChildren: () => System.import('./apkForm/apkForm.module') },

    {
        path: 'pages',
        component: Pages,
        children: [
            { path: '', redirectTo: 'store', pathMatch: 'full' },
            { path: 'dashboard', loadChildren: () => System.import('./dashboard/dashboard.module') },
        ]
    }
];

export const routing = RouterModule.forChild(routes);
