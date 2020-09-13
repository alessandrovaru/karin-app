export type Roles = 'student' | 'admin';

export interface User{
    username: string;
    password: string;
}

export interface NewUser{
    username: string;
    email: string;
    password: string;
    role: Roles;
}


export interface UserCreated{
    message: string;
    token: string;
    userId: number;
    role: Roles;
}


export interface UserResponse{
    message: string;
    token: string;
    userId: number;
    role: Roles;
}
