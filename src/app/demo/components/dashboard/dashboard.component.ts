// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { MenuItem } from 'primeng/api';
// import { Subscription, debounceTime } from 'rxjs';
// import { LayoutService } from 'src/app/layout/service/app.layout.service';

// @Component({
//     templateUrl: './dashboard.component.html',
// })
// export class DashboardComponent implements OnInit, OnDestroy {

//     items!: MenuItem[];

//     subscription!: Subscription;

//     constructor(
//         public layoutService: LayoutService) { }

//     ngOnInit() {
//     }

//     ngOnDestroy() {
//         if (this.subscription) {
//             this.subscription.unsubscribe();
//         }
//     }
// }


import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { ApiService } from '../../service/api.service';

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {

    items!: MenuItem[];
    subscription!: Subscription;

    dashboardCards = [
        {
            label: 'User',
            icon: 'pi pi-user',
            count: 6, bgClass: 'bg-cyan-100',
            iconClass: 'text-cyan-500',
            routerLink: '/users',
            roles: ['admin', 'manager'],
        },
        {
            label: 'Transactions',
            icon: 'pi pi-table',
            description: 'Admin Transactions',
            bgClass: 'bg-purple-100',
            iconClass: 'text-purple-500',
            routerLink: '/invoices',
            roles: ['admin', 'manager'],
        },
        {
            label: 'Transactions',
            icon: 'pi pi-table',
            description: 'User Transactions',
            bgClass: 'bg-purple-100',
            iconClass: 'text-purple-500',
            routerLink: '/invoices-user',
            roles: ['admin', 'manager', 'user'],
        }
    ];

    filteredCards = [];

    total_item: any

    total_today: any

    userRole: string

    constructor(
        public layoutService: LayoutService,
        public api: ApiService
    ) { }
    ngOnInit(): void {
        const userInfo = localStorage.getItem("_userInfo");
        if (userInfo) {
            const parsedUserInfo = JSON.parse(userInfo);
            const userRole = parsedUserInfo?.role_perm;
            this.filteredCards = this.dashboardCards.filter(card => card.roles.includes(userRole));
            this.userRole = userRole
        }

        this.get_total()
        this.get_total_today()

    }

    async get_total() {
        this.api.get_invoices().then((res: any) => {
            this.total_item = res.count
        }).catch((error) => {
            console.log(error);
        })
    }

    async get_total_today() {
        this.api.countToday_post().then((res: any) => {
            this.total_today = res.data
        }).catch((err) => {
            console.log(err);
        })
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
