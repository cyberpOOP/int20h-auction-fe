import { Component } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { IUser } from '../../../models/IUser';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '@shared/components/modal/modal.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['../auth-common-styles.scss'],
})
export class SignInComponent {
    error: string;

    loginForm = new FormGroup({
        email: new FormControl(''),
        password: new FormControl(''),
    });

    user: IUser = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    };

    constructor(
        private authService: AuthService,
        private dialog: MatDialog,
        private router: Router,
    ) {}

    submitForm(event: SubmitEvent) {
        event.preventDefault();
        this.signIn();
    }

    private signIn() {
        this.user.email = this.email.value;
        this.user.password = this.password.value;
        this.authService.signIn(this.user).subscribe(
            (result) => {
                const token = (result as any).value.accessToken;
                const user = (result as any).value;
                localStorage.setItem('accessToken', token);
                localStorage.setItem('user', JSON.stringify(user));
                this.router.navigate(['/']);
            },
            (error) => {
                this.dialog.open(ModalComponent, {
                    data: {
                        header: 'Error',
                        content: (error.error as any).message,
                    },
                });
            },
        );
    }

    get email(): FormControl {
        return this.loginForm.get('email') as FormControl;
    }

    get password(): FormControl {
        return this.loginForm.get('password') as FormControl;
    }
}
