import { Routes, RouterModule }  from '@angular/router';
import { uploadPageComponent } from "./upload-page.component";

// noinspection TypeScriptValidateTypes
const routes: Routes = [
    {
        path: '',
        component: uploadPageComponent
    }
];

export const routing = RouterModule.forChild(routes);
