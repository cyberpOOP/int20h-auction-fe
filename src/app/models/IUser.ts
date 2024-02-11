export interface IUser {
    firstName: string;
    lastName: string;
    email?: string;
    password?: string;
    phone?: string;
    avatarUrl? : string;
}

export interface IAccessToken {
    accessToken: string;
}
