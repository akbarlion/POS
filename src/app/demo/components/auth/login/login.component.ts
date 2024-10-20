import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/demo/service/auth.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

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
export class LoginComponent implements OnInit {

    username: string;

    password: string;

    returnUrl = 'dashboard'

    constructor(
        public layoutService: LayoutService,
        public auth: AuthService,
        public messageService: MessageService,
        public router: Router
    ) { }

    ngOnInit(): void {
        this.auth.logout()
    }

    service_message(severity: string, summary: string, detail: string) {
        this.messageService.clear();
        this.messageService.add({ severity: severity, summary: summary, detail: detail })
    }

    login() {
        let userlogin;
        if (!this.username && !this.password) {
            this.service_message('warn', 'WARN', 'Username dan Password Tidak Boleh Kosong')
        }
        const data = {
            username: this.username,
            password: this.password
        }

        this.auth.login(data).then((res: any) => {
            userlogin = res

            if (userlogin.status == 401) {
                this.service_message('error', 'Not Found', 'Username Atau Password Salah')
            } else if (userlogin.status == 200) {
                localStorage.setItem("_userInfo", JSON.stringify(userlogin.data))
                localStorage.setItem("_rolePerm", userlogin.data.role_perm)
                localStorage.setItem("_loginStatus", "true")
                this.router.navigate([this.returnUrl]);
            }
            return
        }).catch((error) => {
            console.log(error);
        })

    }

}
