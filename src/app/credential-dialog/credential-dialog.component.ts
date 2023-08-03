import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsersService } from 'src/services/users.service';
import { AppComponent } from '../app.component';
import { AuthService } from 'src/authentication/auth.service';
import { User } from 'src/Models/users.model';
import { JwtHelper } from 'src/services/jwt-helper.service';

@Component({
  selector: 'app-credential-dialog',
  templateUrl: './credential-dialog.component.html',
  styleUrls: ['./credential-dialog.component.scss']
})

export class CredentialDialogComponent implements OnInit {

  credentialForm!: FormGroup;
  user!: User;
  hide: boolean = true;

  constructor(private formBuilder: FormBuilder, private appComponent: AppComponent,
    private authService: AuthService, private jwtHelper: JwtHelper,
    @Inject(MAT_DIALOG_DATA) public userData : any,
    private userServices: UsersService,
    private dialogRef: MatDialogRef<CredentialDialogComponent>) {}

  ngOnInit(): void {
    this.credentialForm = this.formBuilder.group({
      userName: ['', Validators.required],
      oldUserName: ['', Validators.required],
      password: ['', Validators.required],
      oldPassword: ['', Validators.required]
    });
    this.user = this.userData;
  }

  logout() {
    this.authService.logout();
    this.appComponent.token = this.jwtHelper.getToken();
    window.location.reload();
  }


  changeCredential() : void {
    var oldUserName = this.credentialForm.controls['oldUserName'].value,
    oldPassword = this.credentialForm.controls['oldPassword'].value;
    if(this.credentialForm.valid && !this.user.isAdmin && this.userData.userName===oldUserName && this.userData.password===oldPassword) {
      this.userData.userName = this.credentialForm.controls['userName'].getRawValue();
      this.userData.password = this.credentialForm.controls['password'].getRawValue();
      this.userServices.changeUserCredential(this.userData).subscribe({
        next: () => this.logout(),
        error: () => {
          this.dialogRef.close;
          alert('failed change user credential');
        },
      });
    }
    else if(this.user.isAdmin) {
      this.userData.userName = this.credentialForm.controls['userName'].getRawValue();
      this.userData.password = this.credentialForm.controls['password'].getRawValue();
      this.userServices.changeUserCredential(this.userData).subscribe({
        next: () => alert('Successfully changed'),
        error: () => alert('Failed to changed'),
      });
      this.dialogRef.close;
    }
    else alert('Please Enter correct UserName and Password');
  }

}
