import { NgModule } from "@angular/core";
import { AuthGuard } from "@core/guards/auth.guard";
import { AuthPageComponent } from "./auth-page/auth-page.component";
import { AuthRoutingModule } from "./auth-routing.module";
import { SharedModule } from "@shared/shared.module";
import { SignInComponent } from "./sign-in/sign-in.component";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { FormsModule } from "@angular/forms";
import { JWT_OPTIONS, JwtHelperService } from "@auth0/angular-jwt";

@NgModule({
    declarations: [AuthPageComponent,  SignInComponent, SignUpComponent],
    imports: [AuthRoutingModule, SharedModule, FormsModule],
    providers: [AuthGuard, { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, JwtHelperService]
})
export class AuthModule { }