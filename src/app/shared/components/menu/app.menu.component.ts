import {Input, OnInit} from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from '../../../layout/service/app.layout.service';
import {Routes} from "../../consts/routes.constant";
import {AppMenuitemComponent} from "./app.menuitem.component";
import {NgForOf, NgIf} from "@angular/common";

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
    standalone: true,
    imports: [
        AppMenuitemComponent,
        NgForOf,
        NgIf
    ]
})
export class AppMenuComponent implements OnInit {

    @Input() mode: 'SIDEBAR' | 'MENUBAR';
    model: any[] = [];
    public routes: typeof Routes = Routes;

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Tareas',
                items: [
                    { label: 'Listado de Tareas', icon: 'pi pi-fw pi-list', routerLink: [this.routes.TASK_LIST] },
                    { label: 'Crear Nueva Tarea', icon: 'pi pi-fw pi-plus', routerLink: [this.routes.ADD_TASK] }
                ]
            }
        ];
    }
}
