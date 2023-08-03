import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/Models/users.model';
import { UsersService } from 'src/services/users.service';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.scss']
})
export class AddUserDialogComponent implements OnInit {

  formUser!: FormGroup;
  toppings = new FormControl('');
  data: User =  {
    userId: '',
    fullName: '',
    userName: '',
    password: '',
    userEmail: '',
    userPhoto: '',
    isAdmin: false,
    isDistributor: false,
    isAreaHead: false,
  };
  file!: File;
  hide: boolean = true;
  constructor(private formBuilder: FormBuilder, private userServices: UsersService,
    private dialogRef: MatDialogRef<AddUserDialogComponent>) {}

  ngOnInit(): void {
    this.formUser = this.formBuilder.group({
      userId: [''],
      fullName: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', Validators.required],
      userPhoto: ['', Validators.required],
      userEmail: ['', Validators.required],
      isAdmin: [false],
      isDistributor: [false],
      isAreaHead: [false],
      userType: ['', Validators.required]
    });
  }

  toppingList: string[] = ['Admin', 'Distributor', 'Area Head'];

  selectedUser() {
    var userType = this.formUser.controls['userType'].getRawValue();
    if(userType==='Admin') this.formUser.controls['isAdmin'].setValue(true);
    else if(userType==='Distributor') this.formUser.controls['isDistributor'].setValue(true);
    else this.formUser.controls['isAreaHead'].setValue(true);
    console.log(userType);
  }

  addUser() {
    this.selectedUser();
    this.data.userId = '0';
    this.data.fullName = this.formUser.controls['fullName'].getRawValue();
    this.data.userName = this.formUser.controls['userName'].getRawValue();
    this.data.password = this.formUser.controls['password'].getRawValue();
    this.data.userPhoto = this.formUser.controls['userPhoto'].getRawValue();
    this.data.userEmail = this.formUser.controls['userEmail'].getRawValue();
    this.data.isAdmin = this.formUser.controls['isAdmin'].getRawValue();
    this.data.isDistributor = this.formUser.controls['isDistributor'].getRawValue();
    this.data.isAreaHead = this.formUser.controls['isAreaHead'].getRawValue(); 
    this.userServices.addUser(this.data).subscribe({
      next: res => {
        this.formUser.controls['userId'].setValue(res.userId);
        var formData = new FormData();
        formData.append('image', this.file);
        this.userServices.uploadImage(this.formUser.controls['userId'].getRawValue(), formData)
        .subscribe({
          next: () => alert('Image uploaded successfully'),
          error: err => alert(err.message),
        });
      },
      error: () => alert('failed to add user'),
    });
    this.dialogRef.close;
  }

  addImage(event: any) {
    this.file = event.target.files[0];
    this.formUser.controls['userPhoto'].setValue(this.file.name);
  }

}
