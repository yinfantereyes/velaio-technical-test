import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { BadgeModule } from 'primeng/badge';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RippleModule } from 'primeng/ripple';
import { AppMenuComponent } from '../shared/components/menu/app.menu.component';
import { AppMenuitemComponent } from '../shared/components/menu/app.menuitem.component';
import { RouterModule } from '@angular/router';
import { AppTopBarComponent } from '../shared/components/top-bar/app.topbar.component';
import { AppFooterComponent } from '../shared/components/footer/app.footer.component';
import { AppConfigModule } from './config/config.module';
import { AppSidebarComponent } from "../shared/components/side-bar/app.sidebar.component";
import { AppLayoutComponent } from "./app.layout.component";
import {MenubarModule} from "primeng/menubar";
import {ToastModule} from "primeng/toast";

@NgModule({
    declarations: [
        AppLayoutComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        InputTextModule,
        SidebarModule,
        BadgeModule,
        RadioButtonModule,
        InputSwitchModule,
        RippleModule,
        RouterModule,
        AppConfigModule,
        MenubarModule,
        ToastModule,
        //----------------
        AppTopBarComponent,
        AppSidebarComponent,
        AppMenuComponent,
        AppMenuitemComponent,
        AppFooterComponent,
    ],
    exports: [
        AppLayoutComponent
    ]
})
export class AppLayoutModule { }
