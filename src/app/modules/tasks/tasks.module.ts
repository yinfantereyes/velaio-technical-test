import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TasksRoutingModule} from "./tasks-routing.module";
import { TaskListComponent } from './task-list/task-list.component';
import { AddTaskComponent } from './add-task/add-task.component';
import {ButtonModule} from "primeng/button";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {SharedModule} from "primeng/api";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CalendarModule} from "primeng/calendar";
import {RippleModule} from "primeng/ripple";
import {TooltipModule} from "primeng/tooltip";
import {CheckboxModule} from "primeng/checkbox";
import {RadioButtonModule} from "primeng/radiobutton";
import {TagModule} from "primeng/tag";

@NgModule({
    declarations: [
    TaskListComponent,
    AddTaskComponent
  ],
    imports: [
        CommonModule,
        TasksRoutingModule,
        ButtonModule,
        DropdownModule,
        InputTextModule,
        SharedModule,
        ReactiveFormsModule,
        CalendarModule,
        RippleModule,
        TooltipModule,
        RadioButtonModule,
        TagModule,
        FormsModule
    ]
})
export class TasksModule {
}
