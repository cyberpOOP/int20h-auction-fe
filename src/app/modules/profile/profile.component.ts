import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { emailFormatRegex, mobilePhoneFormatRegex, nameFormatRegex } from '@core/utils/regex.util';
import { IUser } from '../../models/IUser';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '@shared/components/modal/modal.component';
import { UserService } from '@core/services/user.service';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  firstNameError: string;
  lastNameError: string;
  emailError: string;
  mobilePhoneError: string;

  updateForm = new FormGroup(
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
      })
    }
  );

  user: IUser = {
    FirstName: '',
    LastName: '',
    Email: '',
    Phone: ''
  };

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') as string);
    this.user.FirstName = user.firstName;
    this.user.LastName = user.lastName;
    this.user.Email = user.email;
    this.user.Phone = user.phone;
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
    return !(this.firstName.value !== this.user.FirstName ||
      this.lastName.value !== this.user.LastName ||
      this.email.value !== this.user.Email ||
      this.mobilePhone.value !== this.user.Phone);
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
    this.user.FirstName = this.firstName.value;
    this.user.LastName = this.lastName.value;
    this.user.Email = this.email.value;
    this.user.Phone = this.mobilePhone.value;
    this.userService.updateProfile(this.user).subscribe(
      (result) => {
        const dialogRef = this.dialog.open(ModalComponent, {
          data: {
            header: 'Success',
            content: (result as any).message,
          },
        });

        localStorage.setItem('user', JSON.stringify((result as any).value));

        dialogRef.afterClosed().subscribe(result => {
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
        hasButtons: true
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      result = result === 'true';

      if (!result) {
        return;
      }

      this.userService.deleteProfile().subscribe(result => {
        this.authService.logout();
        location.reload();
      }, error => {
        this.dialog.open(ModalComponent, {
          data: {
            header: 'Error',
            content: "Something went wrong",
          },
        });
      });
    });
  }
}
