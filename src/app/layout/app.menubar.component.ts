import { Component, ElementRef } from '@angular/core';
import { LayoutService } from "./service/app.layout.service";

@Component({
    selector: 'app-menubar',
    templateUrl: './app.menubar.component.html'
})
export class AppMenubarComponent {
    constructor(public layoutService: LayoutService, public el: ElementRef) { }
}

