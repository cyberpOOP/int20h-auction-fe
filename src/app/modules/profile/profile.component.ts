import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { emailFormatRegex, mobilePhoneFormatRegex, nameFormatRegex } from '@core/utils/regex.util';
import { IUser } from '../../models/IUser';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '@shared/components/modal/modal.component';
import { UserService } from '@core/services/user.service';
import { AuthService } from '@core/services/auth.service';
import { base64ToFile } from 'ngx-image-cropper';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
    firstNameError: string;
    lastNameError: string;
    emailError: string;
    mobilePhoneError: string;

    updateForm = new FormGroup({
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
    });

    user: IUser = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
    };

    constructor(
        private userService: UserService,
        private dialog: MatDialog,
        private authService: AuthService,
    ) {}

    ngOnInit(): void {
        const user = JSON.parse(localStorage.getItem('user') as string);
        this.user.firstName = user.firstName;
        this.user.lastName = user.lastName;
        this.user.email = user.email;
        this.user.phone = user.phone;
        this.updateMobilePhone(user.phone);
        this.updateFirstName(user.firstName);
        this.updateLastName(user.lastName);
        this.updateEmail(user.email);
    }

    submitForm(event: SubmitEvent) {
        event.preventDefault();
        this.clearErrors();

        if (!this.validateForm() || this.checkFormChanges()) {
            this.checkErrors();
            return;
        }
        this.updateProfile();
    }

    checkFormChanges(): boolean {
        return !(
            this.firstName.value !== this.user.firstName ||
            this.lastName.value !== this.user.lastName ||
            this.email.value !== this.user.email ||
            this.mobilePhone.value !== this.user.phone
        );
    }

    clearErrors() {
        this.firstNameError = '';
        this.lastNameError = '';
        this.emailError = '';
        this.mobilePhoneError = '';
    }

    private checkErrors() {
        const firstName = this.firstName.value;
        const lastName = this.lastName.value;
        const email = this.email.value;
        const mobilePhone = this.mobilePhone.value;
        const nameRegex = /^([a-zA-Z-]){2,25}$/;
        const emailRegex =
            /^([a-zA-Z-]+([a-zA-Z0-9_.]+)?)@[a-zA-Z0-9]+([-.][a-zA-Z0-9]+)*\.[a-zA-Z0-9]+([-.][a-zA-Z0-9]+)*$/;
        const mobilePhoneRegex = /^[0-9]{10}$/;
        this.firstNameError =
            firstName !== null && nameRegex.test(firstName) ? '' : 'First name must be Latin from 2 to 25 characters';
        this.lastNameError =
            lastName !== null && nameRegex.test(lastName) ? '' : 'Last name must be Latin from 2 to 25 characters';
        this.emailError = emailRegex.test(email) ? '' : 'You entered not valid email';
        this.mobilePhoneError = mobilePhoneRegex.test(mobilePhone) ? '' : 'Mobile phone must consist of 10 digits';
    }

    private validateForm() {
        return this.updateForm.valid;
    }

    private updateProfile() {
        this.user.firstName = this.firstName.value;
        this.user.lastName = this.lastName.value;
        this.user.email = this.email.value;
        this.user.phone = this.mobilePhone.value;
        this.userService.updateProfile(this.user).subscribe(
            (result) => {
                const dialogRef = this.dialog.open(ModalComponent, {
                    data: {
                        header: 'Success',
                        content: (result as any).message,
                    },
                });

                localStorage.setItem('user', JSON.stringify((result as any).value));

                dialogRef.afterClosed().subscribe((result) => {
                    location.reload();
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
        return this.updateForm.get('firstName') as FormControl;
    }

    get lastName(): FormControl {
        return this.updateForm.get('lastName') as FormControl;
    }

    get email(): FormControl {
        return this.updateForm.get('email') as FormControl;
    }

    get mobilePhone(): FormControl {
        return this.updateForm.get('mobilePhone') as FormControl;
    }

    updateMobilePhone(mobilePhone: string) {
        this.mobilePhone.setValue(mobilePhone);
    }

    updateFirstName(firstName: string) {
        this.firstName.setValue(firstName);
    }

    updateLastName(lastName: string) {
        this.lastName.setValue(lastName);
    }

    updateEmail(email: string) {
        this.email.setValue(email);
    }

    deleteAccount() {
        const dialogRef = this.dialog.open(ModalComponent, {
            data: {
                header: 'Confirmation',
                content: 'You sure you want to delete an account?',
                hasButtons: true,
            },
        });

        dialogRef.afterClosed().subscribe((result) => {
            result = result === 'true';

            if (!result) {
                return;
            }

      this.userService.deleteProfile().subscribe(
          (result) => {
              this.authService.logout();
              location.reload();
          },
          (error) => {
              this.dialog.open(ModalComponent, {
                  data: {
                      header: 'Error',
                      content: 'Something went wrong',
                  },
              });
          },
      );
    });
  }

  changeAvatar($event: Event){
    // @ts-ignore
    const file = $event.target.files[0];

    if (file) {
      const formData = new FormData();

      formData.append(file.name, file, `/${file.name}`);

      this.userService.sendImage(formData).subscribe(result =>{
          console.log(result);
      }, error => {
          console.log(error);
      });
    }
  }
}
