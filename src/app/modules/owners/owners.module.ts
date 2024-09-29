import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddOwnerComponent } from './add-owner/add-owner.component';
import { OwnerListComponent } from './owner-list/owner-list.component';
import {OwnersRoutingModule} from "./owners-routing.module";
import {ButtonModule} from "primeng/button";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {MultiSelectModule} from "primeng/multiselect";
import {ProgressBarModule} from "primeng/progressbar";
import {SharedModule} from "primeng/api";
import {SliderModule} from "primeng/slider";
import {TableModule} from "primeng/table";

@NgModule({
  declarations: [
    AddOwnerComponent,
    OwnerListComponent
  ],
    imports: [
        CommonModule,
        OwnersRoutingModule,
        ButtonModule,
        DropdownModule,
        InputTextModule,
        MultiSelectModule,
        ProgressBarModule,
        SharedModule,
        SliderModule,
        TableModule
    ]
})
export class OwnersModule { }
