import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {AppMainComponent} from './shared/components/main/app.main.component';
import {AppNotfoundComponent} from './pages/app.notfound.component';
import {AppLoginComponent} from './pages/auth/app.login.component';
import {AppCrudComponent} from './pages/crud/app.crud.component';
import { AuthGuard } from './guards/auth.guard';
import { NoLoginGuard } from './guards/no-login.guard';

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: '', redirectTo: 'pages', pathMatch: 'full'},
            {
                path: 'pages', component: AppMainComponent,
                children: [
                    { path: '', component: AppCrudComponent},
                ],
                canActivate:[AuthGuard]
            },
            { path: 'login', component: AppLoginComponent, canActivate: [NoLoginGuard] },
            {path: 'notfound', component: AppNotfoundComponent},
            { path: '**', redirectTo: '/notfound' },
        ], {scrollPositionRestoration: 'enabled'})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
