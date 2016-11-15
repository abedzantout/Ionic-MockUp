import { Routes, RouterModule }  from '@angular/router';

import { apkForm } from './apkForm.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
    {
        path: '',
        component: apkForm
    }
];

export const routing = RouterModule.forChild(routes);
