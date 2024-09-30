import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TasksRoutingModule} from "./tasks-routing.module";
import { TaskListComponent } from './task-list/task-list.component';
import { AddTaskComponent } from './add-task/add-task.component';
import {ButtonModule} from "primeng/button";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {MultiSelectModule} from "primeng/multiselect";
import {ProgressBarModule} from "primeng/progressbar";
import {SharedModule} from "primeng/api";
import {SliderModule} from "primeng/slider";
import {TableModule} from "primeng/table";
import {ReactiveFormsModule} from "@angular/forms";
import {CalendarModule} from "primeng/calendar";
import {RippleModule} from "primeng/ripple";

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
        MultiSelectModule,
        ProgressBarModule,
        SharedModule,
        SliderModule,
        TableModule,
        ReactiveFormsModule,
        CalendarModule,
        RippleModule
    ]
})
export class TasksModule {
}
