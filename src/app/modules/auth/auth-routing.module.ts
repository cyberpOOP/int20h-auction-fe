import { RouterModule, Routes } from '@angular/router';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
    {
        path: '',
        component: AuthPageComponent,
        pathMatch: 'prefix',
    },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthRoutingModule {}
