import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TaskService} from "../services/task.service";
import {Routes} from "../../../shared/consts/routes.constant";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import {take} from "rxjs";
import { uniquePersonValidator} from "../../../shared/validators/person-validator";
import {TaskEntity} from "../../../shared/models/task";

@Component({
    selector: 'app-add-task',
    templateUrl: './add-task.component.html',
    styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

    protected readonly router: Router = inject<Router>(Router);
    protected readonly taskService: TaskService = inject<TaskService>(TaskService);
    protected readonly messageService: MessageService = inject<MessageService>(MessageService);
    protected readonly route: ActivatedRoute = inject<ActivatedRoute>(ActivatedRoute);

    public taskForm!: FormGroup;

    public routes: typeof Routes = Routes;
    public loading: boolean = false;
    public taskEditId!: string;

    taskStates: string[] | undefined;

    constructor(protected fb: FormBuilder) {
        this.taskStates = ['Completada', 'Pendiente'];
    }

    ngOnInit(): void {

        const paramId = this.route.snapshot.paramMap.get('id');
        if (paramId) {
            this.taskEditId = paramId;
            this.loadTaskData();
        } else {
            this.taskEditId = undefined;
        }

        this.taskForm = this.fb.group({
            id: new FormControl({value: null, disabled: false}),
            taskName: new FormControl({value: null, disabled: false},
                Validators.compose([Validators.required])
            ),
            endDate: new FormControl({value: null, disabled: false},
                Validators.compose([Validators.required])
            ),
            state: new FormControl({value: null, disabled: false},
                Validators.compose([Validators.required])
            ),
            associatedPerson: this.fb.array([this.createPerson()], uniquePersonValidator)
        })
    }

    public createPerson(): FormGroup {
        return this.fb.group({
            personName: new FormControl({value: null, disabled: false},
                Validators.compose([Validators.required, Validators.minLength(5)])
            ),
            age: new FormControl({value: null, disabled: false},
                Validators.compose([Validators.required, Validators.min(18)])
            ),
            skills: this.fb.array([this.createSkill()])
        });
    }

    public createSkill(): FormControl {
        return this.fb.control('', Validators.required);
    }

    get associatedPerson(): FormArray {
        return this.taskForm.get('associatedPerson') as FormArray;
    }

    public addPerson(): void {
        this.associatedPerson.push(this.createPerson());
    }

    public removePerson(index: number): void {
        this.associatedPerson.removeAt(index);
    }

    public addSkill(personIndex: number): void {
        const skills = this.associatedPerson.at(personIndex).get('skills') as FormArray;
        skills.push(this.createSkill());
    }

    public removeSkill(personIndex: number, skillIndex: number): void {
        const skills = this.associatedPerson.at(personIndex).get('skills') as FormArray;
        skills.removeAt(skillIndex);
    }

    public loadTaskData() {
        this.taskService.getTask(this.taskEditId)
            .pipe(take(1))
            .subscribe(response => {
                const taskList: TaskEntity = response;
                this.taskForm.patchValue({
                    id: taskList.id,
                    taskName: taskList.taskName,
                    endDate: new Date(taskList.endDate),
                    state: taskList.state
                });

                const associatedPersonArray = this.taskForm.get('associatedPerson') as FormArray;
                associatedPersonArray.clear();

                taskList.associatedPerson.forEach(person => {
                    const personGroup = this.createPerson();
                    personGroup.patchValue({
                        personName: person.personName,
                        age: person.age
                    });

                    const skillsArray = personGroup.get('skills') as FormArray;
                    skillsArray.clear();

                    person.skills.forEach(skill => {
                        skillsArray.push(new FormControl(skill, Validators.required));
                    });

                    associatedPersonArray.push(personGroup);
                });
            }, error => {
                this.messageService.add({
                    key: 'tst', severity: 'error', summary: 'Error', detail: error.statusText
                });
            });
    }

    /**
     * Metodo para crear la nueva tarea
     */
    public createTask() {
        this.taskForm.controls["id"].setValue(this.generateTaskId());
        if (this.taskForm.valid) {
            if (this.taskEditId){
                this.taskService.updateTask(this.taskEditId, this.taskForm.value)
                    .pipe(take(1))
                    .subscribe(response => {
                        this.messageService.add({
                            key: 'tst', severity: 'success', summary: 'Correcto', detail: 'Tarea Actualizada'
                        });

                        this.taskForm.reset();
                        this.router.navigate([this.routes.TASK_LIST]);
                    }, error => {
                        this.messageService.add({
                            key: 'tst', severity: 'error', summary: 'Error', detail: error.statusText
                        });
                    });
            } else {
                this.taskService.createTask(this.taskForm.value)
                    .pipe(take(1))
                    .subscribe(response => {
                        this.messageService.add({
                            key: 'tst', severity: 'success', summary: 'Correcto', detail: 'Tarea Creada'
                        });

                        this.taskForm.reset();
                        this.router.navigate([this.routes.TASK_LIST]);
                    }, error => {
                        this.messageService.add({
                            key: 'tst', severity: 'error', summary: 'Error', detail: error.statusText
                        });
                    });
            }
        } else {
            this.messageService.add({
                key: 'tst', severity: 'error', summary: 'Error', detail: 'Debe completar los campos requeridos'
            });
        }
    }

    /**
     * Metodo para cancelar la creacion de la tarea
     */
    public cancelCreateTask() {
        this.taskForm.reset();
        this.router.navigate([this.routes.TASK_LIST]);
    }

    public generateTaskId(): string {
        return new Date().getTime().toString();
    }
}
