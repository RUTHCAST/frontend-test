import {Component, OnInit} from '@angular/core';
import {AppMainComponent} from '../main/app.main.component';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {

    model: any[];

    constructor(public appMain: AppMainComponent) {}

    ngOnInit() {
        this.model = [
            {
                label: 'Pages', icon: 'pi pi-home', routerLink: ['/'],
                items: [
                    {label: 'Crud', icon: 'pi pi-pencil', routerLink: ['/pages']},
                ]
            },
        ];
    }
}
