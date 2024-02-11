export interface IResponse<T> {
    value?: T;
    message?: string;
    status: ResponseStatus;
}

export enum ResponseStatus {
    Success = 0,
    Error = 1,
}
