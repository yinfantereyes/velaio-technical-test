import {Component, OnInit} from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import {AuthenticationService} from "../services/authentication.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Routes} from "../../../shared/consts/routes.constant";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent implements OnInit{
    loginForm!: FormGroup;
    public routes: typeof Routes = Routes;

    valCheck: string[] = ['remember'];

    user!: string;
    password!: string;

    constructor(public layoutService: LayoutService, private fb: FormBuilder,
                private authenticationService: AuthenticationService, protected router: Router) { }

    ngOnInit() {
        this.loginForm = this.fb.group({
            user: new FormControl({ value: null, disabled: false},
                Validators.compose([Validators.required])),
            password: new FormControl({ value: null, disabled: false},
                Validators.compose([Validators.required])),
            remember: new FormControl({ value: false, disabled: false}),
        });
    }

    login(){
        // this.ngxLoaderService.start();
        let loginRequest = this.loginForm.getRawValue();
        this.authenticationService.login(loginRequest)
            .subscribe({
                next: (res) => {

                },
                error: (err) => {
                    this.router.navigate([this.routes.DEMO]);
                    // this.ngxLoaderService.stop();
                    // this.notificacionService.notificationError(
                    //     err.status ? 'Lo sentimos, ocurrió un error al crear la operación' : err
                    // );
                },
            });
    }
}
