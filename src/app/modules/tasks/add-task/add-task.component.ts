import {Component, inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {TaskService} from "../services/task.service";
import {Routes} from "../../../shared/consts/routes.constant";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {PersonEntity} from "../../../shared/models/task";

@Component({
    selector: 'app-add-task',
    templateUrl: './add-task.component.html',
    styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit{

    protected readonly router: Router = inject<Router>(Router);
    protected readonly taskService: TaskService = inject<TaskService>(TaskService);

    public taskForm!: FormGroup;

    public routes: typeof Routes = Routes;
    public loading: boolean = false;

    taskStates: string[] | undefined;

    constructor(protected fb: FormBuilder) {
        this.taskStates = ['Completada', 'Pendiente'];
    }

    ngOnInit(): void {
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
            associatedPerson: this.fb.array([this.createPerson()])
        })
    }

    public createPerson(): FormGroup {
        return this.fb.group({
            personName:  new FormControl({value: null, disabled: false},
                Validators.compose([Validators.required])
            ),
            age:  new FormControl({value: null, disabled: false},
                Validators.compose([Validators.required, Validators.minLength(5)])
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

    addPerson(): void {
        this.associatedPerson.push(this.createPerson());
    }

    removePerson(index: number): void {
        this.associatedPerson.removeAt(index);
    }

    addSkill(personIndex: number): void {
        const skills = this.associatedPerson.at(personIndex).get('skills') as FormArray;
        skills.push(this.createSkill());
    }

    removeSkill(personIndex: number, skillIndex: number): void {
        const skills = this.associatedPerson.at(personIndex).get('skills') as FormArray;
        skills.removeAt(skillIndex);
    }

    /**
     * Metodo para crear la nueva tarea
     */
    public createTask() {
        if (this.taskForm.valid) {
            console.log(this.taskForm.value);
        } else {
            console.log('Form is invalid');
        }
    }

    /**
     * Metodo para cancelar la creacion de la tarea
     */
    public cancelCreateTask() {
        this.router.navigate([this.routes.TASK_LIST]);
    }


}
