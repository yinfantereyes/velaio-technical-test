import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";
import {OwnerListComponent} from "./owner-list/owner-list.component";
import {AddOwnerComponent} from "./add-owner/add-owner.component";

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: OwnerListComponent},
        { path: 'add', component: AddOwnerComponent},
        { path: 'edit/:id', component: AddOwnerComponent},
    ])],
    exports: [RouterModule]
})
export class OwnersRoutingModule { }
