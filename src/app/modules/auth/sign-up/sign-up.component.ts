import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@core/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { matchpassword } from '@core/validators/matchpassword.validator';
import { emailFormatRegex, mobilePhoneFormatRegex, nameFormatRegex, passFormatRegex } from '@core/utils/regex.util';
import { ModalComponent } from '@shared/components/modal/modal.component';
import { IUser } from '../../../models/IUser';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['../auth-common-styles.scss'],
})
export class SignUpComponent {
    firstNameError: string;
    lastNameError: string;
    emailError: string;
    mobilePhoneError: string;
    passwordError: string;
    passwordConfirmationError: string;

    registerForm = new FormGroup(
        {
            email: new FormControl('', {
                validators: [Validators.required, Validators.maxLength(50), Validators.pattern(emailFormatRegex)],
                updateOn: 'submit',
            }),
            firstName: new FormControl('', {
                validators: [Validators.required, Validators.pattern(nameFormatRegex)],
                updateOn: 'submit',
            }),
            lastName: new FormControl('', {
                validators: [Validators.required, Validators.pattern(nameFormatRegex)],
                updateOn: 'submit',
            }),
            mobilePhone: new FormControl('', {
                validators: [Validators.required, Validators.pattern(mobilePhoneFormatRegex)],
                updateOn: 'submit',
            }),
            password: new FormControl('', {
                validators: [Validators.required, Validators.pattern(passFormatRegex)],
                updateOn: 'submit',
            }),
            passwordConfirmation: new FormControl('', {
                validators: [Validators.required],
                updateOn: 'submit',
            }),
        },
        {
            validators: matchpassword,
        },
    );

    user: IUser = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phone: '',
    };

    constructor(
        private authService: AuthService,
        private dialog: MatDialog,
    ) {}

    submitForm(event: SubmitEvent) {
        event.preventDefault();
        this.clearErrors();

        if (!this.validateForm()) {
            this.checkErrors();
            return;
        }
        this.signUp();
    }

    clearErrors() {
        this.firstNameError = '';
        this.lastNameError = '';
        this.emailError = '';
        this.passwordError = '';
        this.passwordConfirmationError = '';
        this.mobilePhoneError = '';
    }

    private checkErrors() {
        const firstName = this.firstName.value;
        const lastName = this.lastName.value;
        const email = this.email.value;
        const mobilePhone = this.mobilePhone.value;
        const password = this.password.value;
        const passwordConfirmation = this.passwordConfirmation.value;
        const nameRegex = /^([a-zA-Z-]){2,25}$/;
        const emailRegex =
            /^([a-zA-Z-]+([a-zA-Z0-9_.]+)?)@[a-zA-Z0-9]+([-.][a-zA-Z0-9]+)*\.[a-zA-Z0-9]+([-.][a-zA-Z0-9]+)*$/;
        const mobilePhoneRegex = /^[0-9]{10}$/;
        const passRegex = /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\\d@$!%*?&.]{6,25}$/;
        this.firstNameError =
            firstName !== null && nameRegex.test(firstName) ? '' : 'First name must be Latin from 2 to 25 characters';
        this.lastNameError =
            lastName !== null && nameRegex.test(lastName) ? '' : 'Last name must be Latin from 2 to 25 characters';
        this.emailError = emailRegex.test(email) ? '' : 'You entered not valid email';
        this.mobilePhoneError = mobilePhoneRegex.test(mobilePhone) ? '' : 'Mobile phone must consist of 10 digits';
        this.passwordError = passRegex.test(password)
            ? ''
            : 'The password must be between 6 and 25 characters long, contain uppercase and lowercase letters, and one of the characters @$!%*?&. or a number';
        this.passwordConfirmationError = password === passwordConfirmation ? '' : 'Password did not match';
    }

    private validateForm() {
        return this.registerForm.valid;
    }

    private signUp() {
        this.user.firstName = this.firstName.value;
        this.user.lastName = this.lastName.value;
        this.user.email = this.email.value;
        this.user.phone = this.mobilePhone.value;
        this.user.password = this.password.value;
        this.authService.signUp(this.user).subscribe(
            (result) => {
                this.dialog.open(ModalComponent, {
                    data: {
                        header: 'Success',
                        content: (result as any).message,
                    },
                });
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

    get firstName(): FormControl {
        return this.registerForm.get('firstName') as FormControl;
    }

    get lastName(): FormControl {
        return this.registerForm.get('lastName') as FormControl;
    }

    get email(): FormControl {
        return this.registerForm.get('email') as FormControl;
    }

    get mobilePhone(): FormControl {
        return this.registerForm.get('mobilePhone') as FormControl;
    }

    get password(): FormControl {
        return this.registerForm.get('password') as FormControl;
    }

    get passwordConfirmation(): FormControl {
        return this.registerForm.get('passwordConfirmation') as FormControl;
    }
}
