export interface IUser {
    firstName: string;
    lastName: string;
    email?: string;
    password?: string;
    phone?: string;
}

export interface IAccessToken {
    accessToken: string;
}
