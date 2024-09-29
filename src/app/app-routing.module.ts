import {RouterModule, Routes} from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";

const routes: Routes = [

    { path: '', redirectTo: '/app/task', pathMatch: 'full' },
    {
        path: 'app', component: AppLayoutComponent,
        children: [
            /** Aquí van los nuevos módulos que se desarrollen en la aplicación */
            { path: '', redirectTo: 'tasks', pathMatch: 'full' },
            { path: 'tasks', loadChildren: () => import('./modules/tasks/tasks.module').then(m => m.TasksModule) },
            { path: 'owners', loadChildren: () => import('./modules/owners/owners.module').then(m => m.OwnersModule) }
        ]
    },
    {
        path: 'demo', component: AppLayoutComponent,
        children: [
            /** Estos son los modulos con componentes de prueba que trae la plantilla */
            { path: '', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
            { path: 'uikit', loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UIkitModule) },
            { path: 'utilities', loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
            { path: 'documentation', loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule) },
            { path: 'blocks', loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
            { path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) }
        ]
    },
    { path: 'login', loadChildren: () => import('./modules/authentication/authentication.module').then(m => m.AuthenticationModule) },
    { path: 'landing', loadChildren: () => import('./modules/landing/landing.module').then(m => m.LandingModule) },
    { path: 'notfound', component: NotfoundComponent },
    { path: '**', redirectTo: '/notfound' },
];


@NgModule({
    imports: [
        RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
