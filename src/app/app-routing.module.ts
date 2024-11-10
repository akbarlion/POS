import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { loginGuard } from './demo/components/login.guard';
import { InvoiceUserComponent } from './demo/components/invoice-user/invoice-user.component';
import { RoleComponent } from './demo/components/role/role.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: '', pathMatch: 'full', redirectTo: 'auth' },
            {
                path: '', component: AppLayoutComponent,
                children: [
                    { path: 'dashboard', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [loginGuard], data: { roles: ['admin', 'manager', 'user'] } },
                    { path: 'invoices', loadChildren: () => import('./demo/components/invoices/invoices.module').then(m => m.InvoicesModule), canActivate: [loginGuard], data: { roles: ['admin', 'manager'] } },
                    { path: 'products', loadChildren: () => import('./demo/components/products/products.module').then(m => m.ProductsModule) },
                    { path: 'users', loadChildren: () => import('./demo/components/users/users.module').then(m => m.UsersModule), canActivate: [loginGuard], data: { roles: ['admin', 'manager'] } },
                    { path: 'invoices-user', component: InvoiceUserComponent, canActivate: [loginGuard], data: { roles: ['admin', 'manager', 'user'] } },
                    { path: 'role', component: RoleComponent, canActivate: [loginGuard], data: { roles: ['admin', 'manager'] } }
                ]
            },
            { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
            { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
            { path: 'access-denied', loadChildren: () => import('./demo/components/auth/access/access-routing.module').then(m => m.AccessRoutingModule) },
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
