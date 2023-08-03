import { Injectable } from "@angular/core";
import { User } from "src/Models/users.model";

@Injectable({
    providedIn: 'root'
})
export class UserData {

    user: User = {
        userId: '',
        fullName: '',
        userName: '',
        password: '',
        userPhoto: '',
        userEmail: '',
        isAdmin: false,
        isDistributor: false,
        isAreaHead: false
    };

    login: boolean = false;

    

    setData(u: User) : void {
        this.user = u;
    }

    getData() : User {
        return this.user;
    }

}