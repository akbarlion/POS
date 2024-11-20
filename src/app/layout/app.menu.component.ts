import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { PrimeIcons } from 'primeng/api';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        const userRole = localStorage.getItem('_rolePerm');
        const allMenuItems = [
            {
                label: 'Sales',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['dashboard'], roles: ['admin', 'manager', 'user'] },
                    { label: 'Admin Transactions', icon: PrimeIcons.LIST, routerLink: ['invoices'], roles: ['admin', 'manager'] },
                    { label: 'User Transactions', icon: PrimeIcons.LIST, routerLink: ['invoices-user'], roles: ['admin', 'manager', 'user'] },
                    { label: 'Users', icon: 'pi pi-fw pi-users', routerLink: ['users'], roles: ['admin', 'manager'] },
                    { label: 'Role', icon: 'pi pi-fw pi-users', routerLink: ['role'], roles: ['admin', 'manager'] }
                ]
            },
        ];

        this.model = allMenuItems.map(menu => {
            return {
                ...menu,
                items: menu.items.filter(item => item.roles.includes(userRole))
            };
        });
    }
}