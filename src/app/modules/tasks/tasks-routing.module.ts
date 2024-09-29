import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";
import {AddTaskComponent} from "./add-task/add-task.component";
import {TaskListComponent} from "./task-list/task-list.component";

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: TaskListComponent},
        { path: 'add', component: AddTaskComponent},
    ])],
    exports: [RouterModule]
})
export class TasksRoutingModule { }
