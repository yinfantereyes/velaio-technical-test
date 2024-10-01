import {Component, inject, OnInit} from '@angular/core';
import {TaskService} from "../services/task.service";
import {TaskEntity} from "../../../shared/models/task";
import {MessageService} from "primeng/api";
import {take} from "rxjs";
import {Router} from "@angular/router";
import {Routes} from "../../../shared/consts/routes.constant";

@Component({
    selector: 'app-task-list',
    templateUrl: './task-list.component.html',
    styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

    public taskList: TaskEntity[] = [];
    public filterSelected: string = 'Todas';

    protected readonly router: Router = inject<Router>(Router);
    protected readonly taskService: TaskService =
        inject<TaskService>(TaskService);
    protected readonly messageService: MessageService =
        inject<MessageService>(MessageService);

    public routes: typeof Routes = Routes;

    constructor() {
    }

    ngOnInit(): void {
        this.loadTasks();
    }

    /**
     * Metodo para cargar todas las tareas
     */
    public loadTasks() {
        this.taskService.getTasks()
            .pipe(take(1))
            .subscribe({
                next: (res) => {
                    this.taskList = res;
                    this.filterTasks();
                },
                error: (err) => {
                    this.messageService.add({
                        key: 'tst', severity: 'error', summary: 'Error', detail: err.statusText
                    });
                },
            });
    }

    /**
     * Metodo para filtrar las tareas
     */
    public filterTasks() {
        if (this.filterSelected !== 'Todas') {
            this.taskList = this.taskList.filter(task => task.state === this.filterSelected);
        }
    }

    /**
     * Metodo para marcar una tarea como Completada (cambio de estado)
     * @param selectedTask
     */
    public completeTask(selectedTask: TaskEntity) {
        console.log(selectedTask)
        if (selectedTask.state == 'Pendiente') {
            selectedTask.state = 'Completada';
            this.taskService.updateTask(selectedTask.id, selectedTask)
                .pipe(take(1))
                .subscribe({
                    next: (res) => {
                        this.messageService.add({
                            key: 'tst', severity: 'success', summary: 'Correcto', detail: 'Tarea Actualizada'
                        });
                    },
                    error: (err) => {
                        this.messageService.add({
                            key: 'tst', severity: 'error', summary: 'Error', detail: err.statusText
                        });
                    },
                });
        }
    }

    /**
     * Metodo para redireccionar el componente de creación de la tarea y poder editarla
     * @param taskId
     */
    editTask(taskId: string){
        this.router.navigate([this.routes.EDIT_TASK, taskId]);
    }

    /**
     * Metodo para eliminar una tarea
     * @param taskId
     */
    removeTask(taskId: string){
        this.taskService.deleteTask(taskId)
            .pipe(take(1))
            .subscribe({
                next: (res) => {
                    this.messageService.add({
                        key: 'tst', severity: 'success', summary: 'Correcto', detail: 'Tarea Eliminada'
                    });
                    this.loadTasks();
                },
                error: (err) => {
                    this.messageService.add({
                        key: 'tst', severity: 'error', summary: 'Error', detail: err.statusText
                    });
                },
            });
    }
}
