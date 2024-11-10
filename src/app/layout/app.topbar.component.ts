import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { ApiService } from '../demo/service/api.service';
import { AuthService } from '../demo/service/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    items!: MenuItem[];

    user: string

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(
        public layoutService: LayoutService,
        public auth: AuthService,
        public router: Router
    ) { }

    ngOnInit(): void {
        this.user = JSON.parse(localStorage.getItem("_userInfo")).username
        // this.user = userAcc ? userAcc.username : ''
    }

    logout() {
        this.auth.logout()
        this.router.navigate(['/'])
    }
}
