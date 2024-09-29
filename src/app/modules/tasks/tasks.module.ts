import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TasksRoutingModule} from "./tasks-routing.module";
import { TaskListComponent } from './task-list/task-list.component';
import { AddTaskComponent } from './add-task/add-task.component';

@NgModule({
    declarations: [
    TaskListComponent,
    AddTaskComponent
  ],
    imports: [
        CommonModule,
        TasksRoutingModule
    ]
})
export class TasksModule {
}
