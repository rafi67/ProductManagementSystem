import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/Models/users.model';

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  baseUrl = 'https://localhost:7071/api/User/';

  constructor(private http: HttpClient) { }

  getAllUser() : Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl+'GetAllUser');
  }

  addUser(data: any) : Observable<User> {
    return this.http.post<User>(this.baseUrl+'AddUser', data);
  }

  changeUserCredential(user: any) : Observable<User> {
    return this.http.put<User>(this.baseUrl+'EditUser', user);
  }

  uploadImage(id: string, formData: FormData) : Observable<Response> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': 'Bearer '+token,
    });
    return this.http.post<Response>(this.baseUrl+'UploadUserImg/'+id, formData, { headers });
  }

  updateImage(id: string, formData: FormData) : Observable<Response> {
    return this.http.put<Response>(this.baseUrl+'UpdateUserImage/'+id, formData);
  }

  updateUser(userData: User) : Observable<Response> {
    return this.http.put<Response>(this.baseUrl+'EditUser', userData);
  }

  deleteUser(id: string) : Observable<Response> {
    return this.http.delete<Response>(this.baseUrl+'DeleteUser/'+id);
  }

}
