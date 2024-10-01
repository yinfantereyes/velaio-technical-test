import {RouterModule, Routes} from '@angular/router';
import { NgModule } from '@angular/core';
import { AppLayoutComponent } from "./layout/app.layout.component";

const routes: Routes = [

    { path: '', redirectTo: '/app/tasks', pathMatch: 'full' },
    {
        path: 'app', component: AppLayoutComponent,
        children: [
            { path: '', loadChildren: () => import('./modules/tasks/tasks.module').then(m => m.TasksModule) },
            { path: 'tasks', loadChildren: () => import('./modules/tasks/tasks.module').then(m => m.TasksModule) }
        ]
    },
    { path: '**', redirectTo: '/app/tasks' },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
