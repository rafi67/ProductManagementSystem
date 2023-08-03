export interface User {
    userId: string;
    fullName: string;
    userName: string;
    password: string;
    userPhoto: string;
    userEmail: string;
    isAdmin: boolean;
    isDistributor: boolean;
    isAreaHead: boolean;
}

export class Login {
    userName: string = '';
    password: string = '';
}

export class JwtAuth {
    token: string = '';
    message: string = '';
}