import {Component, inject, OnInit} from '@angular/core';
import {TaskService} from "../services/task.service";
import {TaskEntity} from "../../../shared/models/task";
import {MessageService} from "primeng/api";

@Component({
    selector: 'app-task-list',
    templateUrl: './task-list.component.html',
    styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

    public taskList: TaskEntity[] = [];

    protected readonly taskService: TaskService =
        inject<TaskService>(TaskService);
    protected readonly messageService: MessageService =
        inject<MessageService>(MessageService);

    constructor() {
    }

    ngOnInit(): void {
        this.loadTasks();
    }

    public loadTasks() {
        this.taskService.getTasks().subscribe({
            next: (res) => {
                this.taskList = res;
                console.log(this.taskList)
            },
            error: (err) => {
                this.messageService.add({
                    key: 'principalMessage', severity: 'error', summary: 'Error', detail: err
                });
            },
        });
    }
}
