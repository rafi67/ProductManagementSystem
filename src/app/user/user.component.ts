import { MatTableDataSource } from '@angular/material/table';
import { UsersService } from 'src/services/users.service';
import {  Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { CredentialDialogComponent } from '../credential-dialog/credential-dialog.component';
import { EditPersonalInfoDialogComponent } from '../edit-personal-info-dialog/edit-personal-info-dialog.component';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  picPath: string = 'https://localhost:7071/Pictures';
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['Name', 'Email', 'Photo', 'User', 'CredentialSettings', 'UserDetails', 'DeleteUser'];

  constructor(private userServices: UsersService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getAllUser();
  }

  getAllUser() {
    this.userServices.getAllUser().subscribe( {
      next: response => {
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: err => alert(err.message),
    }
    );
  }

  openAddUser() : void {
    this.dialog.open(AddUserDialogComponent).afterClosed().
      subscribe(
        () => this.getAllUser(),
      );
  }

  openCredentialDialog(row: any) : void {
    this.dialog.open(CredentialDialogComponent, {
      data: row,
    }).afterClosed().subscribe(
      () => this.getAllUser(),
    );
  }

  openEditDetails(userData: any) : void {
    this.dialog.open(EditPersonalInfoDialogComponent, {
      data: userData
    }).afterClosed().subscribe(
      () => this.getAllUser()
    );
  }

  deleteUser(id:string) {
    this.userServices.deleteUser(id).subscribe({
      next: () => {
        alert('User deleted successfully');
        this.getAllUser();
      },
      error: () => alert('Failed to delete User')
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
