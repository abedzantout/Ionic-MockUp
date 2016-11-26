import { Routes, RouterModule }  from '@angular/router';
import { StoreComponent } from "./store.component";

// noinspection TypeScriptValidateTypes
const routes: Routes = [
    {
        path: '',
        component: StoreComponent
    }
];

export const routing = RouterModule.forChild(routes);
