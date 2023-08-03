import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsersService } from 'src/services/users.service';

@Component({
  selector: 'app-edit-personal-info-dialog',
  templateUrl: './edit-personal-info-dialog.component.html',
  styleUrls: ['./edit-personal-info-dialog.component.scss']
})
export class EditPersonalInfoDialogComponent implements OnInit {

  userDetailsForm!: FormGroup;
  imgPath: string = 'https://localhost:7071/';
  image: string = null!;
  constructor(private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public userData: any,
    private userServices: UsersService,
    private dialogRef: MatDialogRef<EditPersonalInfoDialogComponent>) { }

  ngOnInit(): void {
    this.userDetailsForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      userPhoto: [''],
      userEmail: ['', Validators.required],
      photoFile: ['']
    });
    this.userDetailsForm.controls['fullName'].setValue(this.userData.fullName);
    this.userDetailsForm.controls['userPhoto'].setValue(this.userData.userPhoto);
    this.userDetailsForm.controls['userEmail'].setValue(this.userData.userEmail);
    this.userDetailsForm.controls['photoFile'].setValue(this.userData.userPhoto);
  }

  file!: File;

  updateUserImage(event: any) : void {
    if(event.target.files.length) {
      this.file = event.target.files[0];
      this.userDetailsForm.controls['userPhoto'].setValue(this.file.name);
      this.userDetailsForm.controls['photoFile'].setValue(this.file.name);
    }
    else this.userDetailsForm.controls['userPhoto'].setValue('');
  }

  update() {
    this.userData.fullName = this.userDetailsForm.controls['fullName'].getRawValue();
    this.userData.userEmail = this.userDetailsForm.controls['userEmail'].getRawValue();
    this.image = this.userDetailsForm.controls['userPhoto'].getRawValue();
   
      this.userServices.updateUser(this.userData).subscribe({
        next: () => alert('Successfully User updated'),
        error: () => alert('Failed to update User'),
      })

      if(this.image!=this.userData.userPhoto) {
        const formData = new FormData();
        formData.append('image', this.file);
        this.userServices.updateImage(this.userData.userId, formData)
          .subscribe({
            next: () => alert('Image updated successfully'),
            error: () => alert('Failed to update image'),
          });
        }

    this.dialogRef.close;
  }

}
